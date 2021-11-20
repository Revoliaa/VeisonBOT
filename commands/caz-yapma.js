//Modüller
const Discord = require("discord.js");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message) => {
  
  let cazyabma = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setColor(settings.eglence)
    .setTitle("Lan Caz Yapma.")
    .setImage("https://media1.tenor.com/images/feb6a2b451ccf4b7cda5e6570eda504c/tenor.gif?itemid=18406133")
    .setTimestamp()
    .setFooter("Veison BOT");
  message.channel.send(cazyabma);
  return
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["cazyapma", "caz"],
  permlevel: 0
};

exports.help = {
  name: "Caz Yapma",
  description: "Lan Caz Yapma dersiniz.",
  usage: "/caz"
};