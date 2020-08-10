const { Command } = require("discord.js-commando");
const fb = require("../../firebase-util.js");

class ListCmd extends Command {
    constructor(client) {
        super(client, {
            name : "list",
            aliases : ["ls", "show"],
            group : "banking",
            memberName : "list",
            description : "lists the files stored under a given account, defaults to your account",
            args : [
                {
                    key : "user",
                    prompt : "which user would you like to see the bank account of?",
                    type : "string",
                    default : "self",
                    validate : (text) => {
                        return text.match(/<@!(.+)>/i) != null;
                    }
                }
            ]
        });
    }

    run (msg, { user }) {
        var userId = msg.author.id;
        if (user != "self") {
            userId = user.match(/<@!(.+)>/i)[1];
        }

        // hide private entries if not in a DM with the bot
        fb.getUser(userId).then((userRef) => {
            userRef.once("value").then((snap) => {
                snap = snap.toJSON();

                // check who is looking at the bank account: show private if it is owner, else show public
                // iterate through the keys and put them into a string
                var output = "";
                var hidden = 0;
                for (var key in snap) {
                    if (!fb.isPrivateAllowed(msg, userId)) {
                        if (snap[key].visibility == "public") {
                            output += ` \`${key}\``;
                        } else {
                            hidden++;
                        }
                    } else {
                        output += ` \`${key}\``;
                    }
                }

                if (hidden > 0) {
                    return msg.reply(`the user ${msg.author.tag} has the following public entries in their bank account: ${output}. An additional \`${hidden}\` private entries can be shown if you are the account owner and use the command in a DM with bank bot.`);
                } else {
                    return msg.reply(`the user ${msg.author.tag} has the following public/private entries in their bank account: ${output}`);
                }
            }).catch((err) => {
                return msg.reply(err);
            });
        }).catch((err) => {
            return msg.reply(err);
        });
    }
}

module.exports = ListCmd;
