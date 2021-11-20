//Modüller
const Discord = require("discord.js");
const figlet = require("figlet");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => {
  
  let text = args.join(" ");
  
  if (!text) {
    let notext = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor(settings.eglence)
      .setDescription("Bir yazı yazman lazım.")
    message.channel.send(notext);
    return
  };
  
  if (text.length > 2000) {
    let maxchar = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor(settings.eglence)
      .setDescription("Çevirilecek yazı 2000 karakterden küçük olmalı.")
    message.channel.send(maxchar);
    return
  };
  
  figlet(text, function (err, data){
    
    if (err) {
      let errorembed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setColor(settings.eglence)
        .setDescription("Bir hata oluştu lütfen daha sonra tekrar deneyin.")
      message.channel.send(errorembed);
      console.log(err);
      return
    };
    
    message.channel.send("```" + data + "```")
    
  });
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ascii"],
  permLevel: 0
};

exports.help = {
  name: "Ascii Yazı",
  description: "İstediğiniz Kelimeleri Ascii Olarak Yazdırır.",
  usage: "/Ascii [yazdırmak istediğiniz kelimeler]"
};
