//Modüller
const Discord = require("discord.js");
const fetch = require('node-fetch')
//Dosyalar
const settings = require("../settings.json");

exports.run = async (client, message, args) => {
  
  if (message.channel.type === "dm") {
    let dmolmz = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bu komutu özel mesajlarda kullanamazsın.")
      .setColor(settings.eglence);
    message.channel.send(dmolmz);
    return
  };  
  
  if(!message.member.voice.channel) {
    let noChan = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Öncelikle bir ses kanalına girmelisin.")
      .setColor(settings.eglence);   
    message.channel.send(noChan);
    return    
  };
  
  let embed = new Discord.MessageEmbed()
  fetch(`https://discord.com/api/v8/channels/${message.member.voice.channel.id}/invites`, {
    method: "POST",
    body: JSON.stringify({
      max_age: 86400,
      max_uses: 0,
      target_application_id: "814288819477020702",
      target_type: 2,
      temporary: false,
      validate: null
    }),
    headers: {
      "Authorization": `Bot ${client.token}`,
      "Content-Type": "application/json"
    }
    }).then(res => res.json()).then(invite => {
      embed.setAuthor(client.user.username, client.user.avatarURL())
      embed.setDescription(`**Aktif etmek için tıkla. :point_down:**\n[${message.member.voice.channel.name}](https://discord.gg/${invite.code})`)
      embed.setColor(settings.eglence)
    message.channel.send(embed);
    }).catch((err) => {
      let error = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Beklenmedik bir hata oluştu lütfen daha sonra tekrar deneyin.")
        .setColor(settings.eglence);   
      message.channel.send(error);
      console.log(err);
      return
    })
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["fishington"],
  permlevel: 0
};

exports.help = {
  name: "Fishington",
  decription: "Aynı Ses Kanalında Beraber Oyun Oynamanızı Sağlar.",
  usage: "/Fishington"
};
