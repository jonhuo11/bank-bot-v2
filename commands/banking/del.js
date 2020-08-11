const { Command } = require("discord.js-commando");
const fb = require("../../firebase-util.js");

class DelCmd extends Command {
    constructor(client) {
        super(client, {
            name : "del",
            aliases : ["rm", "delete", "remove", "dump", "clear"],
            group : "banking",
            memberName : "del",
            description : "deletes the file with the given name",
            args : [
                {
                    key : "filename",
                    prompt : "what is the filename of the file you want to delete?",
                    type : "string"
                }
            ]
        });
    }

    run (msg, { filename }) {
        fb.db.ref(`users/${msg.author.id}/${filename}`).once("value").then((snap) => {
            if (snap.exists()) {
                snap.ref.remove().then(() => {
                    return msg.reply(`removed file \`${filename}\` from your bank account`);
                }).catch((err) => {
                    return msg.reply(err);
                });
            } else {
                return msg.reply(`no file with name \`${filename}\` was found in your bank account`);
            }
        });
    }
}

module.exports = DelCmd;
