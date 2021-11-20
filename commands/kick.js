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
  
  let id = args[0];
  let formattedID = message.guild.members.cache.get(id);
  let atılan = message.mentions.users.first();
  let sebep = args.slice(1).join(" ");
  let botrol = message.guild.member(client.user).roles.highest.position;
  let kicklog;
  let atılanrol;
  
  if(!message.member.hasPermission("KICK_MEMBERS")) {
    let yetkiyok = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bu komutu kullanabilmek için **Üyeleri At** yetkisine sahip olmanız gerek.")
      .setColor(settings.moderasyon);
    message.channel.send(yetkiyok);
    return
  };   
  
  if (!message.guild.members.cache.get(client.user.id).hasPermission("KICK_MEMBERS")) {
    let yetkimyok = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bir kullanıcıyı banlamak için **Üyeleri At** yetkisine ihtiyacım var.")
      .setColor(settings.moderasyon);
    message.channel.send(yetkimyok);
    return
  };   
  
  if (sebep.length < 1) sebep = "Sebep belirtilmedi.";  
  
  if (!atılan) {
    
    if (!id) {
      let kisiyok = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Atmak istediğiniz kullanıcıyı belirtmeniz gerek.")
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
      let kendinekick = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Kendi kendini atamazsın.")
        .setColor(settings.moderasyon);
      message.channel.send(kendinekick);
      return
    };
    
    if (formattedID.id === client.user.id) {
      let botakick = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Bot kendini atamaz.")
        .setColor(settings.moderasyon);
      message.channel.send(botakick);
      return
    };    
    
    if (message.guild.members.cache.get(formattedID.id).hasPermission("KICK_MEMBERS")) {
      let banlananyetkisivar = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Bu kullanıcıyı atamam, **Üyeleri At** yetkisi var.")
        .setColor(settings.moderasyon);
      message.channel.send(banlananyetkisivar);
      return
    };
    
    let atılanrol = formattedID.roles.highest.position;
    
    if (atılanrol > botrol) {
      let rolubuyuk = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Kicklememi istediğin kişinin rolü benim rolümden üst srada olduğu için kickleyemiyorum.")
      .setColor(settings.moderasyon);
      message.channel.send(rolubuyuk);
      return
    };
    
    let kicklog = new Discord.MessageEmbed()
        .setColor(settings.moderasyon)
        .setTimestamp()
        .addField("İşlem : ", "Kick")
        .addField("Atılan Kişi : ", `${formattedID.user.username}#${formattedID.user.discriminator} (${formattedID.id})`)
        .addField("Atan Kişi : ", `${message.author.username}#${message.author.discriminator}`)
        .addField("Sebep : ", sebep)
        .setFooter("Veison BOT");
    
    if (db.has(`log_${message.guild.id}`) === false)  {
      let kanalayarsız = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Kick logu için kanal ayarlanmamış.")
      .setColor(settings.moderasyon);
      message.channel.send(kanalayarsız);
      return
    }
    else {
      let modlog = message.guild.channels.cache.get(db.fetch(`log_${message.guild.id}`).replace("<#", "").replace(">", ""));
      modlog.send(kicklog);
      formattedID.send(kicklog); 
      message.guild.member(formattedID).kick();
      let basarili = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Belirttiğiniz kişi başarıyla atıldı.")
        .setColor(settings.moderasyon)
      message.channel.send(basarili);
      return
    };    
    
  }
  else if (atılan) {
    
    if (atılan.id === message.author.id) {
      let kendinekick = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Kendi kendini atamazsın.")
        .setColor(settings.moderasyon);
      message.channel.send(kendinekick);
      return
    };

    if (atılan.id === client.user.id) {
      let botakick = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Bot kendini atamaz.")
        .setColor(settings.moderasyon);
      message.channel.send(botakick);
      return
    };
    
    if (message.guild.members.cache.get(atılan.id).hasPermission("KICK_MEMBERS")) {
      let banlananyetkisivar = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Bu kullanıcıyı atamam, **Üyeleri At** yetkisi var.")
        .setColor(settings.moderasyon);
      message.channel.send(banlananyetkisivar);
      return
    };    
    
    let atılanrol = message.guild.member(atılan).roles.highest.position;
    
    if (atılanrol > botrol) {
      let rolubuyuk = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Kicklememi istediğin kişinin rolü benim rolümden üst srada olduğu için kickleyemiyorum.")
      .setColor(settings.moderasyon);
      message.channel.send(rolubuyuk);
      return
    };
    
    let kicklog = new Discord.MessageEmbed()
        .setColor(settings.moderasyon)
        .setTimestamp()
        .addField("İşlem : ", "Kick")
        .addField("Atılan Kişi : ", `${atılan.username}#${atılan.discriminator} (${atılan.id})`)
        .addField("Atan Kişi : ", `<@${message.author.id}> - ${message.author.id}`)
        .addField("Sebep : ", sebep)
        .setFooter("Veison BOT");
    
    if (db.has(`log_${message.guild.id}`) === false)  {
      let kanalayarsız = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Kick logu için kanal ayarlanmamış.")
      .setColor(settings.moderasyon);
      message.channel.send(kanalayarsız);
      return
    }
    else {
      let modlog = message.guild.channels.cache.get(db.fetch(`log_${message.guild.id}`).replace("<#", "").replace(">", ""));      
      modlog.send(kicklog);
      atılan.send(kicklog); 
      message.guild.member(atılan).kick();
      let basarili = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Belirttiğiniz kişi başarıyla atıldı.")
        .setColor(settings.moderasyon)
      message.channel.send(basarili);
      return
    };
    
  };
 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kick"],
  permlevel: 2
};

exports.help = {
  name: "Kick",
  description: "Bir Kişiyi Sunucudan Atarsınız.",
  usage: "/Kick @kullanıcı"
};