const {CommandoClient} = require("discord.js-commando");
const path = require("path");
const fs = require("fs");

const config = JSON.parse(fs.readFileSync("config.json"));

const client = new CommandoClient({
    commandPrefix : config.prefix,
    owner : config.owner,
    invite : config.invite
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["helper", "useful helper commands"],
        ["banking", "banking commands"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, config.commandFolder));

client.once("ready", ()=>{
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(config.activity);
});

client.on("error", console.error);

// environment variable, hidden for github
client.login(process.env.BANKBOTV2TOKEN);
