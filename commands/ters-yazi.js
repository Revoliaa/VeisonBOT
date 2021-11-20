//Modüller
const Discord = require("discord.js");
//Dosyalar
const settings = require("../settings.json");

exports.run = function(client, message, args,params) {
 
  if (message.channel.type === "dm") {
    let dmolmz = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bu komutu özel mesajlarda kullanamazsın.")
      .setColor(settings.eglence);
    message.channel.send(dmolmz);
    return
  };
    
  if (args.length < 1) {
    let msjyok = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor(settings.eglence)
      .setDescription("Yazmam için bir şey yazmalısın.");
    message.channel.send(msjyok);
    return;
  };
  
  const here = ["@here", "@everyone", "discord.app", "discord.gg", ".com", ".net", ".xyz", ".tk", ".cf", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl",".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".hub", ".org", "ereh@", "enoyreve@"];
  
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
  
  message.channel.send(args.join(' ').split('').reverse().join(''));
  
  message.delete();
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tersyazı", "ters"],
  permLevel: 0
};

exports.help = {
  name: "Ters Yazı",
  description: "İstediğiniz Kelimeleri Ters Olarak Yazdırır.",
  usage: "/Tersyazı [yazdırmak istediğiniz kelimeler]"
};