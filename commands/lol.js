//Modüller
const Discord = require("discord.js");
const opggScrape = require('opgg-scrape');
//Dosyalar
const settings = require("../settings.json");

exports.run = async (client,message, args) => {

  const bölge = args[0];

  const isim = args.slice(1).join(" ");

  if(!bölge) {
    let bölgeyok = new Discord.MessageEmbed()
      .setColor(settings.genel)
      .setDescription("Bir bölge yazman lazım. `| na | kr | oce | jp | euw | eune | lan | br | las | ru | tr |`")
      .setFooter("Veison BOT");
    message.channel.send(bölgeyok);
    return;
  };
  
  let regions = ["na", "kr", "oce", "jp", "euw", "eune", "lan", "br", "las", "ru", "tr"];
  
  if (!regions.some(word => message.content.toLowerCase().includes(word))) {
    let invalidregion = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Lütfen geçerli bir bölge girin `na | kr | oce | jp | euw | eune | lan | br | las | ru | tr`")
      .setColor(settings.genel);
    message.channel.send(invalidregion);
    return
  };
  
  if(!isim) {
    let isimyok = new Discord.MessageEmbed()
      .setColor(settings.genel)
      .setTitle("Bir Nick yazman lazım.")
      .setFooter("Veison BOT");
    message.channel.send(isimyok);
    return;
  };

opggScrape.getStats(`${isim}`, {region: `${bölge}`, refresh: false}).then(stats => {

  const lp = (stats.rankedLP == 'none' ? 'Bilinmiyor' : stats.rankedLP);
  const kill = stats.KDA.kills;
  const deaths = stats.KDA.deaths;
  const assists = stats.KDA.assists;
  const kdaR = stats.KDARatio;

  const rankedlp1 = (stats.rankedLP == 'none' ? '0' : stats.rankedLP);
  const kill1 = (kill == 'NaN' ? 'Bilinmiyor' : kill);
  const deaths1 = (deaths == 'NaN' ? 'Bilinmiyor' : deaths);
  const assists1 = (assists == 'NaN' ? 'Bilinmiyor' : assists);
  const kdaR1 = (kdaR == '' ? 'Bilinmiyor' : kdaR);

  let bilgi = new Discord.MessageEmbed()
    .setColor(settings.genel)
    .setAuthor(client.user.username, client.user.avatarURL())
    .setThumbnail("https://cdn.discordapp.com/attachments/781639169780088872/790688971348115476/kisspng-tencent-league-of-legends-pro-league-defense-of-th-5b37b5edf384d3.2499188715303777099975-rem.png")
    .setTitle(`${isim} Kişisinin LoL istatistikleri : `)
    .addField(`${isim}'in Leveli : `, `${stats.level}`, true)
    .addField(`${isim}'in Rankı : `, `${stats.rank}`, true)
    .addField(`${isim}'in Lpsi : `, `${rankedlp1}`, true)
    .addField(`${isim}'in Öldürme Oranı : `, `${kill1}`, true)
    .addField(`${isim}'in Ölme Oranı : `, `${deaths1}`, true)
    .addField(`${isim}'in Asist Oranı : `, `${assists1}`, true)
    .addField(`${isim}'in KDA Oranı : `, `${kdaR1}`, true)
    .setDescription("Veriler Op.gg'den alındığı için güncel olmayabilir.")
    .setTimestamp()
    .setFooter("Veison BOT");

  message.channel.send(bilgi);
  
}).catch(() => {
    let deletederr = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Kullanıcı bulunamadı, lütfen doğru bir nick belirtin.")
      .setColor(settings.genel);
    message.channel.send(deletederr);
    return
  });
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['lol'],
    permLevel: 0
};
 
  exports.help = {
    name: 'LoL',
    description: 'Nickini Girdiğiniz Hesabın İstatistiklerini Gösterir.',
    usage: '/LoL [Bölge] [Nick]',
};