//Modüller
const Discord = require("discord.js");
const moment = require("moment");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => {
  
  let id = args[0];
  
  let formattedID = message.guild.members.cache.get(id);
  
  let member = message.mentions.users.first();

  let status = {
    online: "Çevrimiçi",
    idle: "Boşta",
    dnd: "Rahatsız Etmeyin",
    offline: "Çevrimdışı / Görünmez"
  };
    
  if (!args[0]) {
    let kendiembed = new Discord.MessageEmbed()
      .setColor(settings.bilgi)
      .setTitle(message.author.tag + " Kullanıcısının Bilgileri : ")
      .setThumbnail(message.author.avatarURL({format : "png", dynamic: true, size:1024}))
      .addField("İD'si : ", message.author.id, true)
      .addField("Hesabın Oluşturulma Tarihi : ", `${moment(message.author.createdAt).format('DD/MM/YYYY')}`)
      .addField("Hesabın Sunucuya Katılma Tarihi : ", moment.utc(message.guild.members.cache.get(message.author.id).joinedAt).format("DD/MM/YYYY"), true)
      .addField("Rolleri : ", message.member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(" | ") || 'Rolü Bulunmuyor.')
      .addField("Aktiflik Durumu : ", `${status[message.author.presence.status]}` ? `${status[message.author.presence.status]}` :"Bulunamadı", true)
      .setFooter("Veison BOT")
      .setTimestamp();
    message.channel.send(kendiembed);
    return
  };
  
  if (message.mentions.members.size >= 1) {
    let etiketembed = new Discord.MessageEmbed()
      .setColor(settings.bilgi)
      .setTitle(member.tag + " Kullanıcısının Bilgileri : ")
      .setThumbnail(member.avatarURL({format : "png", dynamic: true, size:1024}))
      .addField("İD'si : ", member.id, true)
      .addField("Hesabın Oluşturulma Tarihi : ", `${moment(member.createdAt).format('DD/MM/YYYY')}`)
      .addField("Hesabın Sunucuya Katılma Tarihi : ", moment.utc(message.guild.members.cache.get(member.id).joinedAt).format("DD/MM/YYYY"), true)
      .addField("Rolleri : ", message.mentions.members.first().roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(" | ") || 'Rolü Bulunmuyor.')
      .addField("Aktiflik Durumu : ", `${status[member.presence.status]}` ? `${status[member.presence.status]}` :"Bulunamadı", true)
      .setFooter("Veison BOT")
      .setTimestamp();
    message.channel.send(etiketembed);
    return  
  };
  
  if (formattedID == undefined) {
    let hataembed = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor(settings.bilgi)
      .setDescription("Geçersiz kullanıcı lütfen geçerli bir kullanıcı girin.");
    message.channel.send(hataembed)
    return
  }
  else {
    let idembed = new Discord.MessageEmbed()
      .setColor(settings.bilgi)
      .setTitle(formattedID.user.tag + " Kullanıcısının Bilgileri : ")
      .setThumbnail(formattedID.user.avatarURL({format : "png", dynamic: true, size:1024}))
      .addField("İD'si : ", formattedID.user.id, true)
      .addField("Hesabın Oluşturulma Tarihi : ", `${moment(formattedID.user.createdAt).format('DD/MM/YYYY')}`)
      .addField("Hesabın Sunucuya Katılma Tarihi : ", moment.utc(message.guild.members.cache.get(formattedID.id).joinedAt).format("DD/MM/YYYY"), true)
      .addField("Rolleri : ", formattedID.roles.cache.map(roles => `${roles}`).join(" | "))
      .addField("Aktiflik Durumu : ", `${status[formattedID.user.presence.status]}` ? `${status[formattedID.user.presence.status]}` :"Bulunamadı", true)
      .setFooter("Veison BOT")
      .setTimestamp();
    message.channel.send(idembed);
    return      
  };  
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kb","kullanıcıbilgi","userinfo"],
  permlevel: 0
};

exports.help = {
  name: "Kullanıcı Bilgi",
  description: "Etiketlediğiniz Kişinin veya Kendinizin Bilgilerini Gönderir.",
  usage: "/KullanıcıBilgi @kullanıcı"
};