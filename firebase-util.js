const firebase = require("firebase-admin");
const fs = require("fs");

const cfg = JSON.parse(fs.readFileSync(process.env.BANKBOTCONFIG)); // assign config file location to env variable

const app = firebase.initializeApp({
    credential : firebase.credential.cert(cfg),
    databaseURL : cfg.firebaseURL
});
const db = app.database();

// helper logger
const logger = (text) => {
    console.log(`[${Date.now()}] ${text}`);
};

// helper function for determining if a user already has records
const getUser = (userId) => {
    return db.ref(`users/${userId}`).once("value").then((snap) => {
        return new Promise((resolve, reject) => {
            if (snap.exists()) {
                return resolve(snap.ref); //TODO: check if calling ref is efficient?
            } else {
                return reject("this user either does not exist on record, or their bank account is empty");
            }
        });
    });
};

// helper function to see if the user is allowed to see private results
const isPrivateAllowed = (cmd, otherUserId) => {
    // hide private entries if not in a DM with the bot
    var isDm = false;
    if (cmd.channel.type == "dm") {
        isDm = true;
    }

    var isOwner = false;
    if (cmd.author.id == otherUserId) {
        isOwner = true;
    }

    if (isDm && isOwner) {
        return true;
    } else {
        return false;
    }
};

module.exports = {
    config : cfg,
    app : app,
    db : db,
    log : logger,

    // helper functions
    getUser : getUser,
    isPrivateAllowed : isPrivateAllowed
};
