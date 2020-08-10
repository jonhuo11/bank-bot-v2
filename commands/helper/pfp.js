const { Command } = require("discord.js-commando");

class PfpCmd extends Command {
    constructor(client) {
        super(client, {
            name : "pfp",
            aliases : ["getpfp", "pfpof"],
            group : "helper",
            memberName : "pfp",
            description : "gets the profile picture of a specified user",
            args : [
                {
                    "key" : "user",
                    "prompt" : "which user would you like to get the profile picture of?",
                    "type" : "string"
                }
            ]
        });
    }

    run(msg, { user }) {
        var match = user.match(/<@!(.+)>/i);
        if (match) {
            msg.client.users.fetch(match[1]).then((usr) => {
                return msg.say(usr.displayAvatarURL());
            }).catch((err)=>{
                return msg.say(err);
            });
        } else {
            return msg.say("could not find this user");
        }
    }
}

module.exports = PfpCmd;
