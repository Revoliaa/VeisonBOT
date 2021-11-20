//Modüller
const Discord = require("discord.js");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => {
  
  let fbi = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setColor(settings.eglence)
    .setImage("https://media1.giphy.com/media/QUY2pzDAKVpX3QacCg/200.gif")
    .setTitle("OPIN DI DOR !");
  message.channel.send(fbi);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["fbi", "epiay"],
  permLevel: 0
};

exports.help = {
  name: "FBİ",
  description: "FBİ Evinizi Basar.",
  usage: "/Fbi"
};