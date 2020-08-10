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
const isUserRegistered = (userId) => {
    return db.ref(`users/${userId}`).once("value").then((snap) => {
        return new Promise((resolve, reject) => {
            if (snap.exists()) {
                return resolve(snap.ref); //TODO: check if calling ref is efficient?
            } else {
                return reject("user does not exist in records or their bank account is empty");
            }
        });
    });
};

module.exports = {
    config : cfg,
    app : app,
    db : db,
    isUserRegistered : isUserRegistered,
    log : logger
};
