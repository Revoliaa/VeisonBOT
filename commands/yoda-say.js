//Modüller
const Discord = require("discord.js");
const yodasay = require("yodasay");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => {
  
  let text = args.slice(0).join(" ");
  
  if (!text) {
    let notext = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor(settings.eglence)
      .setDescription("Yazmam için bir şey yazmalısın.")    
    message.channel.send(notext);
    return
  };
  
message.channel.send("```" + yodasay.say({text : text}) + "```");
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yodasay", "sayyoda"],
  permLevel: 0
};

exports.help = {
  name: "Yoda Say",
  description: "İstediğiniz Kelimeleri Yoda Tarafından Yazılmış Gibi Yazdırır.",
  usage: "/Yodasay [yazdırmak istediğiniz kelimeler]"
};