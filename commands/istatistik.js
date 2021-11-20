//Modüller
const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");
//Dosyalar
const settings = require("../settings.json");

exports.run = async (client, message, args) => {
  
  const zaman = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
  
  const istatistikler = new Discord.MessageEmbed()
    .setColor(settings.bilgi)
    .setTimestamp()
    .setFooter("Veison BOT")
    .addField("» **Botun Sahibi**", "<@546190684097347586>")
    .addField("» **Gecikme süresi**","Bot Gecikmesi: {ping2} ms"
    .replace("{ping2}", client.ws.ping),true)
    .addField("» **RAM kullanımı**",(process.memoryUsage().heapUsed / 1024 / 512).toFixed(2) + " MB",true)
    .addField("» **Çalışma süresi**", zaman, true)
    .addField("» **Sunucular**", client.guilds.cache.size.toLocaleString(), true)
    .addField("» **Kanallar**", client.channels.cache.size.toLocaleString(), true)  
    .addField("» **Kullanıcılar**",client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
    .addField("» **CPU**",`\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
    .addField("**Davet linki için**"," [TIKLA](https://discord.com/oauth2/authorize?client_id=737335589367709818&permissions=10246&scope=bot)", true)
    .addField("**Destek sunucusu için**","[TIKLA](https://discord.gg/eYT32W35PJ)", true);
  
  return message.channel.send(istatistikler);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["istatistik", "i"],
  permlevel: 0
};

exports.help = {
  name: "İstatistik",
  decription: "Botun İstatistiklerini Gösterir.",
  usage: "/istatistik"
};