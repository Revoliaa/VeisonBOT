//Modüller
const Discord = require("discord.js");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => {
  
let text = message.mentions.users.first();

  if (message.channel.type === "dm") {
    let dmolmz = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bu komutu özel mesajlarda kullanamazsın.")
      .setColor(settings.eglence);
    message.channel.send(dmolmz);
    return
  };
  
if (!text) {
  let notext = new Discord.MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setColor(settings.eglence)
  .setDescription("Kartopu atmak istediğin kişiyi etiketlemen lazım.");
  message.channel.send(notext);
  return;
};
  
  message.channel.send("<====  :snowflake:")
    .then(message => {
      setTimeout(function() {
        message.edit("<===  :snowflake:")
      }, 500);
      setTimeout(function() {
        message.edit("<==  :snowflake:")
      }, 1000);
      setTimeout(function() {
        message.edit("<=  :snowflake:")
      }, 1500);
      setTimeout(function() {
        message.edit("<  :snowflake:")
      }, 2000);
      setTimeout(function() {
        message.edit(":snowflake:")
      }, 2500);    
      setTimeout(function() {
        message.edit(`${text} artık :snowman: oldu.`)
      }, 3000);
    })
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kartopu"],
  permLevel: 0
};

exports.help = {
  name: "Kartopu",
  description: "Etiketlediğiniz Kişiye Kartopu Atarsınız.",
  usage: "/Kartopu @kullanıcı"
};