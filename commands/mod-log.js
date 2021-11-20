//Modüller
const Discord = require("discord.js");
const db = require("quick.db");
//Dosyalar
const settings = require("../settings.json");

exports.run = async(client,message,args) => {
  
  if (message.channel.type === "dm") {
    let dmolmz = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bu komutu özel mesajlarda kullanamazsın.")
      .setColor(settings.moderasyon);
    message.channel.send(dmolmz);
    return
  };
  
  if (!message.member.hasPermission("ADMINISTRATOR")) {     
    let yetkinyok = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Mod Log kanalı ayarlamak için **Yönetici** yetkisine ihtiyacın var.")
      .setColor(settings.moderasyon);   
    message.channel.send(yetkinyok);
    return
   };
  
let logk = message.mentions.channels.first();
  
let logkanal = await db.fetch(`log_${message.guild.id}`);
  
  if (args[0] === "sıfırla") {
    if(!logkanal) {
      let logkanalyok = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Mod Log kanalı zaten ayarlı değil.")
        .setColor(settings.moderasyon);
      message.channel.send(logkanalyok);
      return
    };
    
    db.delete(`log_${message.guild.id}`);
    
    let ayarlandi = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Mod Log kanalı başarıyla sıfırlandı.")
      .setColor(settings.moderasyon);
    message.channel.send(ayarlandi);
    return
  };
  
  if (!logk) {
    let kanalbelirtilmedi = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bir kanal belirtmelisin.")
      .setColor(settings.moderasyon);
    message.channel.send(kanalbelirtilmedi);
    return
  };

  db.set(`log_${message.guild.id}`, logk.id);

  let ayarlandii = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setDescription("Mod Log kanalı başarıyla ayarlandı.")
    .setColor(settings.moderasyon);
  message.channel.send(ayarlandii);
  return
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["modlog"],
  permlevel: 6
};

exports.help = {
  name: "Mod log",
  description: "Logların Atılacağı Kanalı Belirler",
  usage: "/Modlog #kanal / sıfırla"
};