//Modüller
const Discord = require("discord.js");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => {
  
  let id = args[0];
  
  let formattedID = message.guild.members.cache.get(id);
  
  let member = message.mentions.users.first();
  
  if (!args[0]) {
    let kendiembed = new Discord.MessageEmbed()
      .setColor(settings.genel)
      .setTitle(`${message.author.tag} Kişisinin Avatarı :`)
      .setImage(message.author.avatarURL({format: "png", size: 1024, dynamic: true}))
      .setFooter("Veison BOT");
    message.channel.send(kendiembed);
    return
  };
  
  if (message.mentions.users.size >= 1) {
    let etiketembed = new Discord.MessageEmbed()
      .setColor(settings.genel)
      .setTitle(`${member.tag} Kişisinin Avatarı :`)
      .setImage(member.avatarURL({format: "png", size: 1024, dynamic: true}))
      .setFooter("Veison BOT");
    message.channel.send(etiketembed);
    return  
  };
  
  if (formattedID == undefined) {
    let hataembed = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor(settings.genel)
      .setDescription("Geçersiz kullanıcı lütfen geçerli bir kullanıcı girin.");
    message.channel.send(hataembed);
    return
  }
  else {
    let idembed = new Discord.MessageEmbed()
      .setColor(settings.genel)
      .setTitle(`${formattedID.user.tag} Kişisinin Avatarı :`)
      .setImage(formattedID.user.avatarURL({format: "png", size: 1024, dynamic: true}))
      .setFooter("Veison BOT");
    message.channel.send(idembed);
    return      
  };
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pp","avatar"],
  permlevel: 0
};

exports.help = {
  name: "Avatar",
  description: "Etiketlediğiniz veya Kendinizin Profil Fotoğrafını Gönderir.",
  usage: "/Avatar @kullanıcı"
};