//Modüller
const Discord = require("discord.js");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => { 
  
  let slots = ["🍎", "🍌", "🍒", "🍓", "🍈"];
  let result1 = Math.floor((Math.random() * slots.length));
  let result2 = Math.floor((Math.random() * slots.length));
  let result3 = Math.floor((Math.random() * slots.length));
  let result4 = Math.floor((Math.random() * slots.length));
  let result5 = Math.floor((Math.random() * slots.length));
  let result6 = Math.floor((Math.random() * slots.length));
  let result7 = Math.floor((Math.random() * slots.length));
  let result8 = Math.floor((Math.random() * slots.length));
  let result9 = Math.floor((Math.random() * slots.length));  
  
  let win = new Discord.MessageEmbed()
    .setColor(settings.eglence)
    .setTitle("Kazandın !")
    .addField("Sonuç : ", `\`\`\`\n- ${slots[result1] + slots[result2] + slots[result3]}\n- ${slots[result4] + slots[result5] + slots[result6]}\n- ${slots[result7] + slots[result8] + slots[result9]}\`\`\``)
    .setFooter("Veison BOT");  
  
  let lose = new Discord.MessageEmbed()
    .setColor(settings.eglence)
    .setTitle("Kaybettin !")
    .addField("Sonuç : ", `\`\`\`\n- ${slots[result1] + slots[result2] + slots[result3]}\n- ${slots[result4] + slots[result5] + slots[result6]}\n- ${slots[result7] + slots[result8] + slots[result9]}\`\`\``)
    .setFooter("Veison BOT");  
  
  if (slots[result1] === slots[result2] && slots[result1] === slots[result3]) {
    message.channel.send(win);
    return
  }
  else if (slots[result1] === slots[result4] && slots[result1] === slots[result7]) {
    message.channel.send(win);
    return
  }
  else if (slots[result2] === slots[result5] && slots[result2] === slots[result8]) {
    message.channel.send(win);
    return
  }
  else if (slots[result3] === slots[result6] && slots[result3] === slots[result9]) {
    message.channel.send(win);
    return
  }
  else if (slots[result4] === slots[result5] && slots[result4] === slots[result6]) {
    message.channel.send(win);
    return
  }
  else if (slots[result7] === slots[result8] && slots[result7] === slots[result9]) {
    message.channel.send(win);
    return
  }
  else {
    message.channel.send(lose);
    return
  };
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["slot"],
  permlevel: 0
};

exports.help = {
  name: "Slot",
  description: "Slot Çevirirsiniz.",
  usage: "/Slot"
};