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
        return msg.reply(user.match(/<@!(.+)>/i));
    }
}

module.exports = IdCmd;
