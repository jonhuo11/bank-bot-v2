const { Command } = require("discord.js-commando");

class IdCmd extends Command {
    constructor(client) {
        super(client, {
            name : "id",
            aliases : ["getid", "idof"],
            group : "helper",
            memberName : "id",
            description : "gets the id of a specified user",
            args : [
                {
                    "key" : "user",
                    "prompt" : "which user would you like to get the id of?",
                    "type" : "string"
                }
            ]
        });
    }

    run(msg, { user }) {
        var match = user.match(/<@!(.+)>/i);
        if(match) {
            return msg.reply(user.match(/<@!(.+)>/i)[1]);
        } else {
            return msg.reply("could not find this user");
        }
    }
}

module.exports = IdCmd;
