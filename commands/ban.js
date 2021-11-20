//Modüller
const Discord = require("discord.js");
const db = require("quick.db");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args,guild) => {
  
  if (message.channel.type === "dm") {
    let dmolmz = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bu komutu özel mesajlarda kullanamazsın.")
      .setColor(settings.moderasyon);
    message.channel.send(dmolmz);
    return
  };
  
  let sebep = args.slice(1).join(" ");
  let banlanan = message.mentions.users.first();
  let id = args[0];
  let formattedID = message.guild.members.cache.get(id);
  let botrol = message.guild.member(client.user).roles.highest.position;
  let banlananrol;
  let banlog;  
  
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
  
  if (sebep.length < 1) sebep = "Sebep belirtilmedi.";  
  
  if (!banlanan) {
    
    if (!id) {
      let kisiyok = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Banlamak istediğiniz kullanıcıyı belirtmeniz gerek.")
        .setColor(settings.moderasyon);
      message.channel.send(kisiyok);
      return
    }; 

    if (formattedID == undefined) {
      let hataembed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setColor(settings.moderasyon)
        .setDescription("Geçersiz kullanıcı lütfen geçerli bir kullanıcı girin.");
      message.channel.send(hataembed);
      return
    };

    if (formattedID.id === message.author.id) {
      let kendineban = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Kendi kendini banlayamazsın.")
        .setColor(settings.moderasyon);
      message.channel.send(kendineban);
      return
    };    

    if (formattedID.id === client.user.id) {
      let botunkendineban = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Bot kendi kendini banlayamaz.")
        .setColor(settings.moderasyon);
      message.channel.send(botunkendineban);
      return
    };    

    if (formattedID.hasPermission("BAN_MEMBERS")) {
      let banlananyetkisivar = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Bu kullanıcıyı banlayamam, **Üyeleri Engelle** yetkisi var.")
        .setColor(settings.moderasyon);
      message.channel.send(banlananyetkisivar);
      return
    };    

    let banlananrol = formattedID.roles.highest.position;
    
    if (banlananrol > botrol) {
      let rolubuyuk = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Banlamamı istediğin kişinin rolü benim rolümden üst sırada olduğu için banlayamıyorum.")
        .setColor(settings.moderasyon);
      message.channel.send(rolubuyuk);
      return
    };
    
    let banlog = new Discord.MessageEmbed()
      .setColor(settings.moderasyon)
      .setTimestamp()
      .addField("İşlem : ", "Ban")
      .addField("Banlanan Kişi : ", `${formattedID.user.username}#${formattedID.user.discriminator} (${formattedID.id})`)
      .addField("Banlayan Kişi : ", `${message.author.username}#${message.author.discriminator}`)
      .addField("Sebep : ", sebep)
      .setFooter("Veison BOT");
    
    if (db.has(`log_${message.guild.id}`) === false)  {
      let kanalayarsız = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Ban logu için kanal ayarlanmamış.")
        .setColor(settings.moderasyon);
      message.channel.send(kanalayarsız);
      return
    }
    else {
      let modlog = message.guild.channels.cache.get(db.fetch(`log_${message.guild.id}`).replace("<#", "").replace(">", ""));
      message.guild.members.ban(formattedID.id, {days:7, reason: sebep})
      modlog.send(banlog);
      formattedID.send(banlog);
      let basarili = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Belirttiğiniz kişi başarıyla banlandı.")
        .setColor(settings.moderasyon);
      message.channel.send(basarili);
      return
    };    
    
  }
  else if (banlanan) {

    if (message.mentions.users.first().id === message.author.id) {
      let kendineban = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Kendi kendini banlayamazsın.")
        .setColor(settings.moderasyon);
      message.channel.send(kendineban);
      return
    };    

    if (banlanan.id === client.user.id) {
      let botunkendineban = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Bot kendi kendini banlayamaz.")
        .setColor(settings.moderasyon);
      message.channel.send(botunkendineban);
      return
    };    

    if (message.guild.members.cache.get(banlanan.id).hasPermission("BAN_MEMBERS")) {
      let banlananyetkisivar = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Bu kullanıcıyı banlayamam, **Üyeleri Engelle** yetkisi var.")
        .setColor(settings.moderasyon);
      message.channel.send(banlananyetkisivar);
      return
    };

    let banlananrol = message.guild.member(banlanan).roles.highest.position;
    
    if (banlananrol > botrol) {
      let rolubuyuk = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Banlamamı istediğin kişinin rolü benim rolümden üst sırada olduğu için banlayamıyorum.")
        .setColor(settings.moderasyon);
      message.channel.send(rolubuyuk);
      return
    };    

    let banlog = new Discord.MessageEmbed()
      .setColor(settings.moderasyon)
      .setTimestamp()
      .addField("İşlem : ", "Ban")
      .addField("Banlanan Kişi : ", `${banlanan.username}#${banlanan.discriminator} (${banlanan.id})`)
      .addField("Banlayan Kişi : ", `<@${message.author.id}> - ${message.author.id}`)
      .addField("Sebep : ", sebep)
      .setFooter("Veison BOT");    
    
    if (db.has(`log_${message.guild.id}`) === false)  {
      let kanalayarsız = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Ban logu için kanal ayarlanmamış.")
        .setColor(settings.moderasyon);
      message.channel.send(kanalayarsız);
      return
       }
    else {
      let modlog = message.guild.channels.cache.get(db.fetch(`log_${message.guild.id}`).replace("<#", "").replace(">", ""));
      message.guild.members.ban(banlanan.id, {days:7, reason: sebep})
      modlog.send(banlog);
      banlanan.send(banlog);
      let basarili = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Belirttiğiniz kişi başarıyla banlandı.")
        .setColor(settings.moderasyon);
      message.channel.send(basarili);
      return
    };
    
  };

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ban"],
  permlevel: 3
};

exports.help = {
  name: "Ban",
  description: "Etiketlediğiniz Kullanıcıyı Banlar.",
  usage: "/Ban @kullanıcı [sebep]"
};
  