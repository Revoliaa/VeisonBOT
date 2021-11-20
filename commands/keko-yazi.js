//Modüller
const Discord = require("discord.js")
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => {
  
  const randomizeCase = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');
  
  if (message.channel.type === "dm") {
    let dmolmz = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bu komutu özel mesajlarda kullanamazsın.")
      .setColor(settings.eglence);
    message.channel.send(dmolmz);
    return
  };
  
  if (args.length < 1) {
    let yaziyok = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("kEkO gİbİ yAzMaM iÇiN bİr ŞeY yAzMaLıSıN.")
      .setColor(settings.eglence);
    message.channel.send(yaziyok);
    return
  };
  
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
  message.channel.send(args.map(randomizeCase).join(" "));
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["keko"],
  permlevel: 0
};

exports.help = {
  name: "Keko Yazı",
  description: ("Keko Gibi Yazarsınız"),
  usage: ("/keko [kelimeler]")
};