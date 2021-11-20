//Modüller
const Discord = require("discord.js");
const ms = require("ms");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client, message, args) => {
  if (message.channel.type === "dm") {
    let dmolmz = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bu komutu özel mesajlarda kullanamazsın.")
      .setColor(settings.cekilis);
    message.channel.send(dmolmz);
    return
  };

  if (!message.member.hasPermission("MANAGE_GUILD")) {
    let yetkinyok = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Bu komutu kullanabilmek için **Sunucuyu Yönet** yetkisine sahip olmanız gerek.")
      .setColor(settings.cekilis);
    message.channel.send(yetkinyok);
    return
  };

  let toDo = args[0];

  if (!toDo) {
    let notoDo = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription(
        "Bir işlem belirtmelisin. `start | delete | end | reroll`")
      .setColor(settings.cekilis);
    message.channel.send(notoDo);
    return
  };

  let toDos = ["start", "create", "başlat", "sil", "delete", "bitir", "end", "reroll"];
  
  if (!toDos.some(word => message.content.toLowerCase().includes(word))) {
    let gecersiztoDo = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Geçerli bir işlem belirtmelisin. `start | delete | end | reroll`")
      .setColor(settings.cekilis);
    message.channel.send(gecersiztoDo)
    return
  };

  if (toDo === "başlat" || toDo === "start" || toDo === "create") {
    let winner = args[1];

    if (!winner) {
      let nowinner = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Kazanan sayısı yazmalısın.")
        .setColor(settings.cekilis);
      message.channel.send(nowinner);
      return
    };

    if (isNaN(winner) || winner > 25 || winner < 1) {
      let gecersizwinner = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Kazanan sayısı 1 ile 25 arasında olmalı.")
        .setColor(settings.cekilis);
      message.channel.send(gecersizwinner);
      return
    };

    let süre = args[2];

    if (!süre) {
      let nosüre = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Bir süre belirtmen lazım.")
        .setColor(settings.cekilis);
      message.channel.send(nosüre);
      return
    };

    if (isNaN(ms(süre))) {
      let gecersizsüre = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Geçerli bir süre belirtmen lazım.")
        .setColor(settings.cekilis);
      message.channel.send(gecersizsüre);
      return
    };

    if (ms(süre) > ms("15d")) {
      let maxsüre = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("15 Günden az bir zaman belirtmelisin.")
        .setColor(settings.cekilis);
      message.channel.send(maxsüre);
      return
    };

    let odul = args.slice(3).join(" ");

    if (!odul) {
      let noodul = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Ödülün ne olduğunu yazmalısın.")
        .setColor(settings.cekilis);
      message.channel.send(noodul);
      return
    };

    client.giveawaysManager.start(message.channel, {
      time: ms(süre),
      prize: odul,
      winnerCount: parseInt(winner),
      messages: {
        giveaway: "Çekiliş Başlatıldı.",
        giveawayEnded: "Çekiliş Sona Erdi.",
        timeRemaining: "Kalan Zaman : **{duration}**!",
        inviteToParticipate: "Katılmak için  🎉  tepkisine tıklayın",
        winMessage: "Tebrikler, {winners}, **{prize}** ödülünü kazandınız. \n{messageURL}",
        embedFooter: "Veison Çekiliş",
        noWinner: "Maalesef çekiliş iptal edildi.",
        hostedBy: "Çekilişi Başlatan : {user}",
        winners: "Kazanan ",
        endedAt: "Sonlandığı Tarih",
        units: {
          seconds: "saniye",
          minutes: "dakika",
          hours: "saat",
          days: "gün",
          pluralS: false
        }
      }
    });
  } else if (toDo === "sil" || toDo === "delete") {
    let messageID = args[1];

    if (!messageID) {
      let noıd = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Silmek istediğin çekilişin mesaj ID'sini belirtmelisin")
        .setColor(settings.cekilis);
      message.channel.send(noıd);
      return
    };

    client.giveawaysManager.delete(messageID).then(() => {
      let deleted = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Çekiliş başarıyla silindi.")
        .setColor(settings.cekilis);
      message.channel.send(deleted);
      return
    }).catch(() => {
      let deletederr = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Geçersiz mesaj ID'si")
        .setColor(settings.cekilis);
      message.channel.send(deletederr);
      return
			});
  }
  else if (toDo === "bitir" || toDo === "end") {
    let messageID = args[1];
    
    if (!messageID) {
      let noıd = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Bitirmek istediğin çekilişin mesaj ID'sini belirtmelisin")
        .setColor(settings.cekilis);
      message.channel.send(noıd);
      return
    };
    
      client.giveawaysManager.edit(messageID, {setEndTimestamp: Date.now()}).then(() => {
      let ended = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Çekiliş başarıyla sonlandırıldı.")
        .setColor(settings.cekilis);
      message.channel.send(ended);
      return        
      }).catch(() => {
      let deletederr = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Geçersiz mesaj ID'si")
        .setColor(settings.cekilis);
      message.channel.send(deletederr);
      return
    })
  }
  else if (toDo === "reroll") {
    let messageID = args[1];
    
    if (!messageID) {
      let noıd = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Kazananı yeniden çekmek istediğin çekilişin mesaj ID'sini belirtmelisin")
        .setColor(settings.cekilis);
      message.channel.send(noıd);
      return
    };
    
    client.giveawaysManager.reroll(messageID).then(() => {
      let ended = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Kazanan başarıyla yeniden çekildi.")
        .setColor(settings.cekilis);
      message.channel.send(ended);
      return      
    }).catch(() => {
      let deletederr = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription("Geçersiz mesaj ID'si")
        .setColor(settings.cekilis);
      message.channel.send(deletederr);
      return
    })
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["çekiliş", "giveaway"],
  permLevel: 5
};

exports.help = {
  name: "Çekiliş",
  description: "Çekiliş Yapmanızı Sağlar.",
  usage: "/Çekiliş [işlem]"
};
