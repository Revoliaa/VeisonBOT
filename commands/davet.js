//Modüller
const Discord = require("discord.js");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message) => {
  
  let dvt = new Discord.MessageEmbed()
    .setColor(settings.bilgi)
    .setAuthor(client.user.username, client.user.avatarURL())
    .addField("**Davet linki için tıkla.**", "[Davet Et](https://discord.com/oauth2/authorize?client_id=737335589367709818&permissions=268565590&scope=bot)")
    .setTimestamp()
    .setFooter("Veison BOT");
  message.channel.send(dvt);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["davet","invite"],
  permLevel: 0
};

exports.help = {
  name: "Davet",
  description: "Botun Davet Linkini Gönderir",
  usage: "/davet"
};