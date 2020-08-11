const { Command } = require("discord.js-commando");
const fb = require("../../firebase-util.js");

class PullCmd extends Command {
    constructor(client) {
        super(client, {
            name : "pull",
            aliases : ["get", "retrieve", "grab", "view"],
            group : "banking",
            memberName : "pull",
            description : "views the file in the bank account of the specified user",
            args : [
                {
                    key : "filename",
                    prompt : "what is the filename of the file you want to retrieve?",
                    type : "string"
                },
                {
                    key : "user",
                    prompt : "what user does the file belong to?",
                    type : "string",
                    default : "self",
                    validate : (text) => {
                        return text.match(/<@!(.+)>/i) != null;
                    }
                }
            ]
        });
    }

    run (msg, { filename , user }) {
        var userId = msg.author.id;
        if (user != "self") {
            userId = user.match(/<@!(.+)>/i)[1];
        }

        fb.getUser(userId).then((userRef) => {
            userRef.child(filename).once("value").then((snap) => {
                if (snap.exists()) {
                    snap = snap.toJSON();
                    if (snap.visibility != "public") {
                        if (fb.isPrivateAllowed(msg, userId)) {
                            return msg.reply(snap.url);
                        } else {
                            return msg.reply("you are not allowed to view private deposits unless you are the owner of the deposit AND in a DM with bank bot");
                        }
                    } else {
                        return msg.reply(snap.url);
                    }
                } else {
                    return msg.reply(`no file was found with this name under the bank account of user <@!${userId}>`);
                }
            }).catch((err) => {
                return msg.reply(err);
            });
        }).catch((err) => {
            return msg.reply(err);
        });
    }
}

module.exports = PullCmd;
