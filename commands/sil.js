//Modüller
const Discord = require("discord.js");
const db = require("quick.db");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => {
  
  if (message.channel.type === "dm") {
    let dmolmz = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bu komutu özel mesajlarda kullanamazsın.")
      .setColor(settings.moderasyon);
    message.channel.send(dmolmz);
    return
  };
  
  let permyok = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setDescription("Bu komutu kullanabilmek için **Mesajları Yönet** yetkisine sahip olmanız gerek.")
    .setColor(settings.moderasyon);
  
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(permyok);   
  
  if (!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
    let yetkimyok = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bir kullanıcıyı banlamak için **Mesajları Yönet** yetkisine ihtiyacım var.")
      .setColor(settings.moderasyon);
    message.channel.send(yetkimyok);
    return
  };   
  
  const miktar = args[0];
  
  let miktaryok = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setDescription("Silmem için bir miktar belirtmelisin.")
    .setColor(settings.moderasyon);
  
  let miktargecersiz = new Discord.MessageEmbed()
    .setAuthor(client.user.usernma, client.user.avatarURL())
    .setDescription("Miktar 1'den küçük 100'den büyük olamaz.")
    .setColor(settings.moderasyon);
  
  let basarili = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setDescription(`Başarıyla ${args[0]} tane mesaj silindi.`)
    .setColor(settings.moderasyon);
  
  let gecerligir = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setDescription("Miktar 1 ile 100 arasında bir sayı olmalı.")
    .setColor(settings.moderasyon);
  
  let kanalayarsız = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setDescription("Temizleme logu için kanal ayarlanmamış.")
    .setColor(settings.moderasyon);
  
  let clearlog = new Discord.MessageEmbed()
    .setColor(settings.moderasyon)
    .setTimestamp()
    .addField("İşlem : ", "Temizleme")
    .addField("Temizleyen Kişi : ", `<@${message.author.id}> - ${message.author.id}`)
    .addField("Temizleme Miktarı : ", miktar)  
    .addField("Temizlenen Kanal : ", message.channel.name)
    .setFooter("Veison BOT");
  
  if (db.has(`log_${message.guild.id}`) === false)  return message.channel.send(kanalayarsız);
  
  if (!miktar) return message.channel.send(miktaryok);
  else {
    if (miktar < 1 || miktar > 100) return message.channel.send(miktargecersiz);
    else {
      if (isNaN(args[0])) return message.channel.send(gecerligir);
      else {
        message.channel.bulkDelete(miktar)
        message.channel.send(basarili).then(message => {
          setTimeout(function() {
            message.delete()
          }, 3000);
        });
      };
    };
  };
  
  let modlog = message.guild.channels.cache.get(db.fetch(`log_${message.guild.id}`).replace("<#", "").replace(">", ""));
  modlog.send(clearlog);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["clear","sil"],
  permlevel: 1
};

exports.help = {
  name: "Sil",
  description: "Girdiğiniz Miktardaki Mesajı Siler.",
  usage: "/Sil [miktar]"
}