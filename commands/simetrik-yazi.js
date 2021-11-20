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
  
  const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>?@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';
  const OFFSET = '!'.charCodeAt(0);

  if (args.length < 1) {
    let hata = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor(settings.eglence)
      .setDescription("Dönüştürmem için bir yazı yazmalısın.");
    message.channel.send(hata);
    return
  };
  
  message.delete();
  message.channel.send(args).then(message => {
    message.edit(
      args.join(' ').split('')
        .map(c => c.charCodeAt(0) - OFFSET)
        .map(c => mapping[c] || ' ')
        .reverse().join('')
    );      
  });
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["simetrik"],
  permLevel: 0
};

exports.help = {
  name: "Simetrik Yazı",
  description: "İstediğiniz Kelimeleri Bota Simetrik Bir Şekilde Yazdırır.",
  usage: "/Simetrik [yazdırmak istediğiniz kelimeler]"
};