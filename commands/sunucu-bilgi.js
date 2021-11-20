//Modüller
const Discord = require("discord.js");
const moment = require('moment');
//Dosyalar
const settings = require('../settings.json');

exports.run = async (client,message,args) => {
  
  if (message.channel.type === "dm") {
    let dmolmz = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bu komutu özel mesajlarda kullanamazsın.")
      .setColor(settings.bilgi);
    message.channel.send(dmolmz);
    return
  };
  
  let bolgeler = {
    "us-central": ":flag_us: Amerika",
    "us-east": " :flag_us: Doğu Amerika",
    "us-south": ":flag_us: Güney Amerika",
    "us-west": ":flag_us: Batı Amerika",
    "europe": ":flag_eu: Avrupa",
    "singapore": ":flag_sg: Singapur",
    "japan": ":flag_jp: Japonya",
    "russia": ":flag_ru: Rusya",
    "hongkong": ":flag_hk: Hong Kong",
    "brazil": ":flag_br: Brezilya",
    "sydney": ":flag_au: Sidney",
    "india": ":flag_in: Hindistan",
    "southafrica": ":flag_za: Güney Afrika"
  };
    
  let dogrulamaseviyesi = {
    "NONE": "Sunucu Doğrulaması Yok.",
    "LOW": "Düşük (E-posta Doğrulaması)",
    "MEDIUM": "Orta (5 Dk Üyelik)",
    "HIGH": "Yüksek (10 Dk Üyelik)",
    "VERY_HIGH": "Çok Yüksek (Telefon Doğrulamalı)"
  };
    
  var aylar = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  
  let rolemap = message.guild.roles.cache
    .sort((a, b) => b.position - a.position)
    .map(r => r)
    .join(",");  

  let üyesayi = message.guild.memberCount;
  
  let serverboost = message.guild.premiumSubscriptionCount;
  
  let boostlevel;
  
  if (serverboost < 2) {
    boostlevel = 0
  }
  else if (serverboost >= 2) {
    boostlevel = 1
  }
  else if (serverboost >= 15) {
    boostlevel = 2
  }
  else if (serverboost >= 30) {
    boostlevel = 3
  };
  
  const guild = message.guild;
  
  let sOwner;
  
  await message.guild.members.fetch(message.guild.ownerID) // Fetches owner
      .then(guildMember => sOwner = guildMember);
  
  const sunucubilgi = new Discord.MessageEmbed()
    .setColor(settings.bilgi)
    .setTitle(`${message.guild.name} Sunucusunun Bilgileri : `)
    .addField("Sunucu Adı : ", `${message.guild.name}`, true)
    .addField("Sunucu İD : ",message.guild.id ,true)
    .addField("Sunucu İsmi Kısaltması : ", `${message.guild.nameAcronym}`, true)
    .addField("Sunucu Bölgesi : ", `${bolgeler[message.guild.region]}`, true)  
    .addField("Oluşturulma Tarihi : ", `${moment(message.guild.createdAt).format('DD')} ${aylar[moment(message.guild.createdAt).format('MM')]} ${moment(message.guild.createdAt).format('YYYY')}`, true)
    .addField("Doğrulama Seviyesi : ", `${dogrulamaseviyesi[message.guild.verificationLevel]}`, true)
    .addField("Üye Sayısı : ", `${üyesayi}`, true)
    .addField("Toplam Yazı Kanalı : ", `${message.guild.channels.cache.filter(c => c.type === "text").size}`, true)
    .addField("Toplam Ses Kanalı : ", `${message.guild.channels.cache.filter(c => c.type === "voice").size}`, true) 
    .addField(`Takviye Seviyesi : ${boostlevel}`, `**Takviye Durumu : ${serverboost}**` , true)
    .addField("Sunucu Sahibi : ", sOwner, true)  
    .addField("Sunucudaki Tüm Roller : ", rolemap)
    .setTimestamp()
    .setFooter("Veison BOT");
  return message.channel.send(sunucubilgi);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sb", "sunucubilgi", "serverinfo"],
  permLevel: 0
};

exports.help = {
  name: "Sunucu Bilgi",
  description: "Sunucunun İstatistiklerini Görmenizi Sağlar.",
  usage: "/SunucuBilgi"
};