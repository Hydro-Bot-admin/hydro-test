/**
 * Module Imports
 */
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const Discord = require('discord.js');
const client = new Client({ disableMentions: "everyone" });
const moment = require("moment");
client.login('');
client.commands = new Collection();
client.queue = new Map();
const cooldowns = new Collection();
const fs = require('fs');
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

client.website = require("./website/dashboard.js");
//
client.on("ready", () => {
  console.log(`${client.user.username} ready!`);
  client.user.setActivity(`hy.help | hydro-bot.xyz`);
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);
 const prefix22 = 'hy.'


/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (!msg.guild) return;
    let prefix; // define balnk variable with any name you want
  let prefixes = await db.fetch(`prefix_${msg.guild.id}`);
  if(prefixes == null) {
    prefix = "hy." // default prefix if no prefix set for this guild
  } else {
    prefix = prefixes;
  }
  // now we done prefix fetching for guilds

  if (msg.content.startsWith(prefix)) {
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(msg.author.id)) {
      const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return msg.reply(
          `<:musicly:725561917695066172> **please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.**`
        );
      }
    }

    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

    try {
      command.execute(msg, args);
    } catch (error) {
      console.error(error);
      msg.reply("<:musicly:725561917695066172> ``There was an error executing that command.``").catch(console.error);
    }
  }
});
client.on('message', async msg => { 
      if (msg.content.startsWith("hy.prefix")) {
     let prefix = await db.fetch(`prefix_${msg.guild.id}`)
  if (prefix === null) prefix = (prefix22);

   let prefixEmbed = new Discord.RichEmbed()
  .setColor("#00f3ff")
  .setDescription(`<:musicly:725561917695066172> **${msg.guild.name} Prefix Is | ${prefix}  **`);
  msg.channel.send(prefixEmbed)
}
    })

client.on('message', async msg => {
  let prefix = await db.fetch(`prefix_${msg.guild.id}`)
  if (prefix === null) prefix = (prefix22); 
  let moneyEmbed = new Discord.RichEmbed()
  .setColor("#00f3ff")
  .setDescription(`<:musicly:725561917695066172> **${msg.guild.name} Prefix Is | ${prefix}  **`);
  if (msg.author.bot) return;
    if (msg.isMentioned(client.user))
  msg.channel.send(moneyEmbed)
});


const devs = ["700656817344086078"] 
client.on("message", async msg => {
  if (msg.content.startsWith( "hy.blacklist")) {
    var args = msg.content.split(' ').slice(1);
      let user = msg.mentions.users.first() || client.users.get(args[0]);
    let reason = msg.content.split(" ").slice(2).join(" ");
        let Blacklist = await db.fetch(`Blacklist_${user.id}`);
              
      if(Blacklist === null) Blacklist = 'off';
              if (!devs.includes(msg.author.id)) return msg.reply("**Nice Tey LOL.**");
    if(!user) return msg.channel.send(`**Usage: hy.blacklist @user**`);
    if(!reason) return msg.reply ("**Type The Reason Please**");
    msg.channel.send(`**<:musicly:725561917695066172> Done**`);
      user.send(`<:musicly:725561917695066172>**You Are Blacklisted From Using \`Music.ly\` **

\`===============================================\`
**For the reason : __${reason}__**
**Please Contact Support To Apeal** https://hydro-bot.xyz/support `)
    db.set(`Blacklist_${user.id}`, "on").then
    client.channels.get("728876447007244308")
      .send(`**${user.tag} Has been blacklisted
ID : __${user.id}__
By : ${msg.author}
Reason : ${reason}**
\`===============================================\`
`)
    }})


client.on("message", async msg => {
  if (msg.content.startsWith( "hy.guildpremium")) {
    var args = msg.content.split(' ').slice(1);              
              if (!devs.includes(msg.author.id)) return msg.reply("**Nice Try LOL.**");
    msg.channel.send(`**<:musicly:725561917695066172> Done**`);
    db.set(`premium_${args}`,"True")
    }})



client.on("message", async msg => {
    if (msg.content.startsWith( "hy.unblacklist")) {
 if(msg.author.bot) return undefined;
    var args = msg.content.split(' ').slice(1);
      let user = msg.mentions.users.first() || client.users.get(args[0]);
        let Blacklist = await db.fetch(`Blacklist_${user.id}`);
      if(Blacklist === null) Blacklist = 'off';
                    if (!devs.includes(msg.author.id)) return msg.reply("**Nice Try LOL.**");
    if(!user) return msg.channel.send(`**Usage: hy.unblacklist \`<Mention/ID>\`**`);
    msg.channel.send(`**<:musicly:725561917695066172> Done**`);
      user.send(`<:musicly:725561917695066172> **You have been unblacklisted from using __Music.ly__**`)
    db.set(`Blacklist_${user.id}`, "off").then
      client.channels.get("728889384467693658")
      .send(`**${user.tag} Has been unblacklisted
ID : __${user.id}__
By : ${msg.author}**
\`===============================================\`
`)
    }})

client.on('message', async msg => { //this event is fired, whenever the bot sees a new message
  let prefix = await db.fetch(`prefix_${msg.guild.id}`)
    if (prefix === null) prefix = (prefix22);
      if (msg.content.startsWith(prefix + "stats")) {

    let Blacklist = await db.fetch(`Blacklist_${msg.author.id}`);
        if(Blacklist === 'on') return msg.channel.send(`**You are blacklisted from using the bot contact a bot admin to appeal**`);
              if (!devs.includes(msg.author.id)) return msg.reply("**Only bot devs can use this command.**");
    msg.channel.send(`= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Users      :: ${client.users.size.toLocaleString()}
• Servers    :: ${client.guilds.size.toLocaleString()}
• Channels   :: ${client.channels.size.toLocaleString()}
• Node       :: ${process.version}`, {code: "asciidoc"});
}
    })


client.on('message', async msg => {
  let prefix = await db.fetch(`prefix_${msg.guild.id}`)
  if (prefix === null) prefix = (prefix22);  
  var helplist = `**<:musicly:725561917695066172>   Music.ly
  > ${msg.guild.name} Prefix Is | \`\`${prefix}\`\`

  > __Puplic Command's__

  > ${prefix}premium : Show Premium Information
  > hy.help : Show All Command's
  > ${prefix}invite : To Invite Music.ly
  > ${prefix}support : Create A Invite Link To The Support Server
  > ${prefix}dash : To Display Dashboard Link
  > hy.prefix : Show Guild Prefix [OR MENTION <@!712569461592293446>]

  > __Profile Command's__

  > ${prefix}credits : To Display Your Current Credits
  > ${prefix}setbio <Your Bio> : To Set Your Bio 
  > ${prefix}profile : To Display Your Profile
  > ${prefix}daily : Take Your Daily Credits
  > ${prefix}transfer : Transfer Credits



> __Admin Command's__

  > ${prefix}setprefix : Change Server Prefix
  > ${prefix}resetprefix : Reset Prefix To \`\`hy.\`\`
  > ${prefix}kick : To Kick A Member
  > ${prefix}ban : To Ban A Member
  > ${prefix}lock : To Lock Current Text Channel
  > ${prefix}unlock : To Unlock Current Text Channel

**`
  if(msg.content === "ly.help") {
    msg.author.send(helplist)
    msg.author.send("**__Join Support Server__:** https://hydro-bot.xyz/support").then(e => {
          msg.reply("** <:musicly:725561917695066172> See Your DM **");
        })
        .catch(() => {
         
               msg.reply("** Please Open DMs <:musicly:725561917695066172>**")
  })}
});  



client.logger = require("./utils/logger.js");
const config = require("./config.json");
client.config = config;



client.website = require("./website/dashboard.js");

const init = async () => {
  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
    const mod = require.cache[require.resolve(`./events/${file}`)];
    delete require.cache[require.resolve(`./events/${file}`)];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }
  });
};

init();



//     Database Things 