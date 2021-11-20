//Modüller
const Discord = require("discord.js");
const db = require("quick.db");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => {
    
  let prefix = settings.prefix;
  
  if (message.channel.type === "dm") {
    let dmolmz = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bu komutu özel mesajlarda kullanamazsın.")
      .setColor(settings.moderasyon);
    message.channel.send(dmolmz);
    return
  };
  
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    let yetkinyok = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bu komutu kullanabilmek için **Üyeleri Engelle** yetkisine sahip olmanız gerek.")
      .setColor(settings.moderasyon);
    message.channel.send(yetkinyok);
    return
  };
  
  if (!message.guild.members.cache.get(client.user.id).hasPermission("BAN_MEMBERS")) {
    let yetkimyok = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bir kullanıcıyı banlamak için **Üyeleri Engelle** yetkisine ihtiyacım var.")
      .setColor(settings.moderasyon);
    message.channel.send(yetkimyok);
    return
  };
  
  let kullanici = args[0];
  
  let sebep = args.slice(1).join(" ");
  
  if (db.has(`log_${message.guild.id}`) === false) {
    let kanalayarsız = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Unban logu için kanal ayarlanmamış.")
      .setColor(settings.moderasyon);
    message.channel.send(kanalayarsız);
    return
  };
  
  let modlog = message.guild.channels.cache.get(db.fetch(`log_${message.guild.id}`).replace("<#", "").replace(">", ""));
  
  if (isNaN(kullanici)) {
    let idgir = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Banını açmak istediğiniz kullanıcının İD'sini girin.")
      .setColor(settings.moderasyon);
    message.channel.send(idgir);
    return
  };
  
  if (sebep.length < 1) sebep = "Sebep Belirtilmedi.";
  
  let unbanlog = new Discord.MessageEmbed()
    .addField("İşlem : ", "Ban Kaldırma")
    .addField("Banı Kaldırılan Kişi : ", `(${kullanici})`)
    .addField("Banı Kaldıran Kişi : ", `<@${message.author.id}> - ${message.author.id}`)
    .addField("Sebep : ", sebep)
    .setFooter("Veison BOT")
    .setColor(settings.moderasyon)
    .setTimestamp();
  modlog.send(unbanlog);
  
  message.guild.members.unban(kullanici);
  
  let bankaldirildi = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setDescription("Belirttiğiniz ID'li kullanıcının banı kaldırıldı.")
    .setColor(settings.moderasyon)
  message.channel.send(bankaldirildi);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["unban"],
  permlevel: 3
};

exports.help = {
  name: "Unban",
  description: "ID sini Girdiğiniz Kişinin Sunucudaki Yasaklamasını Kaldırır",
  usage: "/unban <ID>"
};