//Modüller
const Discord = require("discord.js");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => {
  
  let yazi = args.slice(0).join("");
  
  let uye = message.mentions.users.first();
  
  let skin = "https://mc-heads.net/body/" + yazi;
  
  if (yazi.length < 1) {
    let  nickgir = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bir nick girmen lazım.")
      .setColor(settings.genel);
    message.channel.send(nickgir);
    return
  };
  
  if (uye === yazi) {
    let noetiket = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bir nick girmen lazım.")
      .setColor(settings.genel);
    message.channel.send(noetiket);
    return    
  }
  else {
    let mcskin = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setTitle(yazi + " Nickli Kişinin Skini :")
      .setImage(skin)
      .setColor(settings.genel);
    message.channel.send(mcskin);   
  };

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mcskin","skin"],
  permlevel: 0
};

exports.help = {
  name: "Mc Skin",
  description: "Adını Girdiğiniz Hesabın Skinini Gösterir.",
  usage: "/Mcskin [nick]"
};