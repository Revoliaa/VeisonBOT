//Modüller
const Discord = require("discord.js");
//Dosyalar
const settings = require("../settings.json");

exports.run = async (client, message, args) => {
    
  if (message.channel.type === "dm") {
    let dmolmz = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bu komutu özel mesajlarda kullanamazsın.")
      .setColor(settings.bilgi);
    message.channel.send(dmolmz);
    return
  };

  let embed = new Discord.MessageEmbed()
    .setColor(settings.bilgi)
    .setTitle(`${message.guild.name} Sunucusunun Görseli :`)
    .setImage(message.guild.iconURL({format: "png", size: 1024, dynamic: true}))
    .setFooter("Veison BOT");
  message.channel.send(embed);
  return    
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucu-pp", "sunucupp"],
  permlevel: 0
};

exports.help = {
  name: "Sunucu Görsel",
  decription: "Komutun Kullanıldığı Sunucunun Görselini Atar.",
  usage: "/sunucu-pp"
};