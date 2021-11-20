//Modüller
const Discord = require("discord.js");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message) => {
  
  let napim = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setColor(settings.eglence)
    .setTitle(message.author.username+" Lafı koydu.")
    .setImage("https://cdn.discordapp.com/attachments/781639169780088872/789563355140063292/73e64ce5da2532fc2939847e63c13a98.png")
    .setTimestamp()
    .setFooter("Veison BOT");
  message.channel.send(napim);
  return
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["napim"],
  permlevel: 0
};

exports.help = {
  name: "Napim",
  description: "Napim Dersiniz.",
  usage: "/Napim"
};