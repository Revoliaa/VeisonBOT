//Modüller
const Discord = require("discord.js");
const cowsay = require("cowsay");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => {
  
  let text = args.slice(0).join(" ");
  
  if (!text) {
    let notext = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor(settings.eglence)
      .setDescription("Yazmam için bir şey yazmalısın.");  
    message.channel.send(notext);
    return
  };
  
  message.channel.send("```" + cowsay.say({text : text}) + "```");
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["cowsay", "saycow"],
  permLevel: 0
};

exports.help = {
  name: "Cow Say",
  description: "İstediğiniz Kelimeleri Bir İnek Söylüyormuş Gibi Yazdırır.",
  usage: "/Cowsay [yazdırmak istediğiniz kelimeler]"
};