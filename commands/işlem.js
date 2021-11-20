//Modüller
const Discord = require("discord.js");
const math = require("mathjs")
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => {
  
  let giris = args.join(" ");
  
  let cikis;
  
  if (!giris) {
    let girisyok = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor(settings.genel)
      .setDescription("Bir işlem yazmalısın ki hesaplayayım.");
    message.channel.send(girisyok);
    return
  };
  
  if (giris === undefined) {
    let gecersizgiris = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor(settings.genel)
      .setDescription("Geçerli bir işlem belirtmelisin.");
    message.channel.send(gecersizgiris);
    return
  };
  
  
  try {
    cikis = math.evaluate(giris);
    let islemembed = new Discord.MessageEmbed()
      .setColor(settings.genel)
      .setAuthor(client.user.username, client.user.avatarURL())
      .addField("Girilen İşlem : ", `\`\`\`css\n${giris}\`\`\``)
      .addField("Sonuç : ", `\`\`\`css\n${cikis}\`\`\``)
      .setTimestamp()
      .setFooter("Veison BOT");
    message.channel.send(islemembed);
  } catch (error) {
      console.log(error);
      let hata = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setColor(settings.genel)
        .setDescription("Bir hata oluştu lütfen daha sonra tekrar deneyin.");
      message.channel.send(hata);
  };
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["math","işlem","calc"],
  permlevel: 0
};

exports.help = {
  name: "İşlem",
  description: "Bota Matematik İşlemi Yaptırırsınız.",
  usage: "/İşlem [Matematik İşlemi]"
};