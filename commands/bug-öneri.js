//Modüller
const Discord = require("discord.js");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => {
  
  let bugoneri = args.slice(0).join(" ");
  
  if (!bugoneri) {
    let yok = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bir bug veya öneri yazman lazım.")
      .setColor(settings.bilgi);
    message.channel.send(yok);
    return
  };
  
  let gonderilecek = new Discord.MessageEmbed()
    .setColor(settings.bilgi)
    .setAuthor(client.user.username, client.user.avatarURL())
    .addField("İşlem : ", "Bug / Öneri Bildirimi")
    .addField("Gönderilen Sunucu : ", `${message.guild.name} - (${message.guild.id})`)
    .addField("Gönderen Kişi : ", `${message.author.tag} - (${message.author.id})`)
    .addField("Gönderilen İleti : ", bugoneri)
    .setTimestamp()
    .setFooter("Veison BOT");
  
  client.channels.cache.get("786720461433733131").send(gonderilecek);
  
  let basarili = new Discord.MessageEmbed()
    .setColor(settings.bilgi)
    .setDescription("Başarılı bir şekilde gönderildi.")
    .setAuthor(client.user.username, client.user.avatarURL());
  
  message.channel.send(basarili).then(message => message.delete({ timeout: 4000}));
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bug","öneri"],
  permLevel: 0
};

exports.help = {
  name: "Bug - Öneri",
  description: "Botla İlgili Bug veya Öneri Gönderirsiniz.",
  usage: "/bug [mesaj]"
};