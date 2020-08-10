const { Command } = require("discord.js-commando");
const fb = require("../../firebase-util.js");

class StashCmd extends Command {
    constructor(client) {
        super(client, {
            name : "stash",
            aliases : ["store", "deposit"],
            group : "banking",
            memberName : "stash",
            description : "stashes the attached file in your account",
            args : [
                {
                    key : "name",
                    prompt : "what name should this file be stored as?",
                    type : "string"
                },
                // TODO: implement public/private stashes
                {
                    key : "visibility",
                    prompt : "should others be allowed to access this file?",
                    type : "string",
                    oneOf : ["public", "private"],
                    default : "private"
                }
            ]
        });
    }

    run(msg, { name , visibility }) {
        // check if there is attachment
        if (msg.attachments.size > 0) {
            // stash the link under the user who sent it
            fb.db.ref(`users/${msg.author.id}/${name}`).set({
                url : msg.attachments.first().url,
                visibility : visibility
            }).then(() => {
                return msg.reply(`Successfully stashed \`${name}\` as a ${visibility} file`);
            }).catch((err) => {
                return msg.reply(err);
            });
        } else {
            return msg.reply("No files were attached for upload");
        }
    }
}

module.exports = StashCmd;
