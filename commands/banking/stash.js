const { Command } = require("discord.js-commando");
const fb = require("../../firebase-util.js");

class StashCmd extends Command {
    constructor(client) {
        super(client, {
            name : "stash",
            aliases : ["put", "store", "deposit"],
            group : "banking",
            memberName : "stash",
            description : "stashes the attached file into your account",
            clientPermissions : [
                "MANAGE_MESSAGES"
            ],
            args : [
                {
                    key : "name",
                    prompt : "what name should this file be stored as?",
                    type : "string"
                },
                {
                    key : "visibility", // TODO: figure out how multiple optional args works
                    prompt : "should others be allowed to access this file?",
                    type : "string",
                    oneOf : ["public", "private"]
                },
                {
                    key : "overwrite",
                    prompt : "should this file overwrite an existing file stored under the same name?",
                    type : "string",
                    oneOf : ["hard", "soft"],
                    default : "soft"
                }
            ]
        });
    }

    run(msg, { name , visibility, overwrite}) {
        // check if the channel is a DM before allowing private posts
        // check if there is attachment
        if (msg.attachments.size > 0) {
            if (msg.channel.type != "dm" && visibility == "private") {
                // delete the sender's message to protect privacy
                return msg.delete({reason : "protect private file", timeout : 200}).then((msg) => {
                    return msg.reply(`your file was deleted to protect your privacy. To stash private files you need to DM them directly to bank bot. If you want to upload a public file you need to set the modifier`);
                }).catch((err) => {
                    return msg.reply(err);
                });
            } else {
                var url = msg.attachments.first().url;

                // check if the file already exists
                fb.db.ref(`users/${msg.author.id}/${name}`).once("value").then((snap) => {

                    if (overwrite != "hard" && snap.exists()) {
                        return msg.reply("a file with the same name already exists in this account, set the overwrite modifier to hard if you wish to overwrite an existing entry");
                    }

                    // stash the link under the user who sent it
                    fb.db.ref(`users/${msg.author.id}/${name}`).set({
                        url : url,
                        visibility : visibility
                    }).then(() => {
                        var old_msg = msg;
                        return msg.reply(`Successfully stashed \`${name}\` as a ${visibility} file and DMed the file url to you`).then((msg) => {
                            return old_msg.direct(`Here is the url for \`${name}\` file: ${url}`);
                        });
                    }).catch((err) => {
                        return msg.reply(err);
                    });

                }).catch((err) => {
                    return msg.reply(err);
                });

            }
        } else {
            return msg.reply("No file was attached for upload");
        }
    }
}

module.exports = StashCmd;
