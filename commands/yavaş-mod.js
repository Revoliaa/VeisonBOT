//Modüller
const Discord = require("discord.js");
const request = require("request");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => {
  
  const limit = args[0];
  
  if (message.channel.type === "dm") {
    let dmolmz = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bu komutu özel mesajlarda kullanamazsın.")
      .setColor(settings.moderasyon);
    message.channel.send(dmolmz);
    return
  };
  
  if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    let yetkinyok = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bu komutu kullanabilmek için **Kanalları Yönet** yetkisine sahip olmanız gerek.")
      .setColor(settings.moderasyon);
    message.channel.send(yetkinyok);
    return;
  };  
  
  if (!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_CHANNELS")) {
    let yetkimyok = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bir kullanıcıyı banlamak için **Kanalları Yönet** yetkisine ihtiyacım var.")
      .setColor(settings.moderasyon);
    message.channel.send(yetkimyok);
    return
  };   
  
  if (!limit) {
    let nolimit = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor(settings.moderasyon)
      .setDescription("120'den küçük olmak üzere bir süre belirtmelisin.")
    message.channel.send(nolimit);
    return;    
  };
  
  if (limit > 120) {
    let maxlimit = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor(settings.moderasyon)
      .setDescription("Süre maksimum 120 saniye olarak ayarlanabilir.")
    message.channel.send(maxlimit);
    return;
  };
  
  if (isNaN(limit)) {
    let nAn = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor(settings.moderasyon)
      .setDescription("Geçerli bir süre belirtin lütfen.")
    message.channel.send(nAn);
    return;    
  };
  
  let ayarlandi = new Discord.MessageEmbed()
    .setColor(settings.moderasyon)
    .setDescription("Yavaş mod başarıyla ayarlandı.")
    .setAuthor(client.user.username, client.user.avatarURL())
  
  message.channel.send(ayarlandi);
  
  message.channel.setRateLimitPerUser(args[0]);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["slowmode", "yavaşmod"],
  permLevel: 4
};

exports.help = {
  name: "Yavaş Mod",
  description: "Kanalda Yavaş Modu Ayarlamanızı Sağlar.",
  usage: "/Yavaşmod [süre]"
};