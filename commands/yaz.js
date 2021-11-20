//Modüller
const Discord = require("discord.js");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => {
  
  if (message.channel.type === "dm") {
    let dmolmz = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bu komutu özel mesajlarda kullanamazsın.")
      .setColor(settings.eglence);
    message.channel.send(dmolmz);
    return
  };   
  
  let mesaj = args.slice(0).join(" ");
  
  let yazi = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setColor(settings.eglence)
    .setDescription("Yazmam için bir şey yazmalısın.")
  
  if (mesaj.length < 1) return message.reply(yazi);
  
  const here = ["@here", "@everyone", "discord.app", "discord.gg", ".com", ".net", ".xyz", ".tk", ".cf", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl",".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".hub", ".org"];
  
  if (here.some(word => message.content.toLowerCase().includes(word))) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.delete();
      message.channel
        .send(`<@${message.author.id}>`)
        .then(message => message.delete());
      var e = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Bu komut ile reklam yapamaz / everyone here çekemezsin !")
        .setColor(settings.eglence);
      message.channel.send(e);
      return;
    };
  };
  
  message.delete();
  
  message.channel.send(mesaj);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["say", "yaz"],
  permLevel: 0
};

exports.help = {
  name: "Yaz",
  description: "İstediğiniz Kelimeleri Bota Yazdırır.",
  usage: "/yaz [yazdırmak istediğiniz kelimeler]"
};