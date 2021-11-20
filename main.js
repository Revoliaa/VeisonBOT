const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
const express = require("express");
const { GiveawaysManager } = require('discord-giveaways');
const Client =  new Discord.Client({ messageCacheMaxSize: 50 });
const app = express();
const settings = require("./settings.json");
Client.commands = new Discord.Collection();
Client.aliases = new Discord.Collection();
let author = settings.author;
let prefix = settings.prefix;

//Uptime
app.get("/", (req, res) => {
  res.render("")
  res.send("I Logged!");
});

//Event Yükleyici
require("./util/eventLoader")(Client);

fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`Yüklenen komut: ${props.help.name}`);
    Client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      Client.aliases.set(alias, props.help.name);
    });
  });
});

Client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      Client.commands.delete(command);
      Client.aliases.forEach((cmd, alias) => {
        if (cmd === command) Client.aliases.delete(alias);
      });
      Client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        Client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

Client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      Client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        Client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

Client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      Client.commands.delete(command);
      Client.aliases.forEach((cmd, alias) => {
        if (cmd === command) Client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

//Çekiliş
const giveawayManager = new GiveawaysManager(Client, {
  storage: "./giveaways.json",
  updateCountdownEvery: 10000,
  hasGuildMembersIntent: false,
  endedGiveawaysLifetime: 120000,  
  default: {
    botsCanWin: false,
    exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
    embedColor: settings.moderasyon,
    embedColorEnd: settings.moderasyon,
    reaction: "🎉"
  }
});

Client.giveawaysManager = giveawayManager;

//Botun DM Görme
Client.on("message", msg => {
var dm = Client.channels.cache.get("ROOM ID")
if(msg.channel.type === "dm") {
if(msg.author.id === Client.user.id) return;
const botdm = new Discord.MessageEmbed()
      .setColor("FFED00")
      .setTimestamp()
      .addField("İşlem : ", "Özel Mesaj Gönderimi")
      .addField("Mesajı Gönderen Kişi : ", msg.author.tag)
      .addField("Gönderilen Mesaj : ", msg.content)
      .setFooter("Veison BOT");
dm.send(botdm)

}
if(msg.channel.bot) return;
});

//Yetki Seviyeleri
Client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permLevel = 0;
  if (message.member.hasPermission("MANAGE_MESSAGES")) permLevel = 1;
  if (message.member.hasPermission("KICK_MEMBERS")) permLevel = 2;
  if (message.member.hasPermission("BAN_MEMBERS")) permLevel = 3;
  if (message.member.hasPermission("MANAGE_CHANNELS")) permLevel = 4;    
  if (message.member.hasPermission("MANAGE_GUILD")) permLevel = 5;
  if (message.member.hasPermission("ADMINISTRATOR")) permLevel = 6;
  if (message.member.id === message.guild.ownerID ) permLevel = 7;
  if (message.author.id === author) permLevel = 8;
  return permLevel;
};

//Giriş Yapma
Client.on('ready', () => {
    console.log(`${Client.user.tag}! Adıyla Giriş Yapıldı !`);
})

Client.login(settings.token);