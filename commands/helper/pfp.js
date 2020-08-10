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
                    key : "user",
                    prompt : "which user would you like to get the profile picture of?",
                    type : "string",
                    validate : text => {
                        return text.match(/<@!(.+)>/i) != null;
                    }
                }
            ]
        });
    }

    run(msg, { user }) {
        var match = user.match(/<@!(.+)>/i);
        msg.client.users.fetch(match[1]).then((usr) => {
            return msg.reply(usr.displayAvatarURL());
        }).catch((err)=>{
            return msg.reply(err);
        });
    }
}

module.exports = PfpCmd;
