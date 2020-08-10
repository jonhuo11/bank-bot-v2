const {CommandoClient} = require("discord.js-commando");
const path = require("path");
const fs = require("fs");
const fb = require("./firebase.js");

const config = fb.config;
const print = fb.log;

const client = new CommandoClient({
    commandPrefix : config.prefix,
    owner : config.owner,
    invite : config.invite
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["helper", "Useful helper commands"],
        ["banking", "Banking commands"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, "commands"));

// on connection with discord
client.once("ready", ()=>{
    print(`Logged in as ${client.user.tag}`);
    client.user.setActivity(config.activity);
});

// for logging events
client.on("message", (msg) => {
    if (!msg.author.bot && (msg.content.startsWith(config.prefix) || msg.channel.type == "dm")) {
        // trims command output to a character limit
        print(`Received command ${msg.content.substring(0, 35)} from user ${msg.author.tag}`);
    }
});

client.on("error", console.error);

client.login(config.discordToken);
