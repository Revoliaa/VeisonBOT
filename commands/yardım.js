//Modüller
const Discord = require("discord.js");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => {

  if (args[0] === "moderasyon") {
    let moderasyonembed = new Discord.MessageEmbed()
      .setColor(settings.yardim)
      .setAuthor(client.user.username, client.user.avatarURL())
      .setTitle("Moderasyon Komutları :")
      .addField("/Ban @kullanıcı [sebep]", "Etiketlediğiniz kişiyi Sunucudan Banlar.")
      .addField("/Kick @kullanıcı [sebep]", "Etiketlediğiniz Kişiyi Sunucudan Atar.")
      .addField("/Sil [miktar]", "O Kanaldaki Belirttiğiniz Miktar Kadar Mesajı Siler.")
      .addField("/Unban <ID> [sebep]", "ID'sini Girdiğiniz Gişinin Sunucudaki Banını Kaldırır.")
      .addField("/Modlog #kanal / sıfırla", "Moderasyon Loglarının Gönderileceği Kanalı Ayarlar.")
      .addField("/YavaşMod [süre]", "Kanalda Yavaş Modu Ayarlamanızı Sağlar.")    
      .setFooter("Veison BOT")
      .setTimestamp() ; 
    message.channel.send(moderasyonembed);
    return
  };
    
  if (args[0] === "çekiliş") {
    let cekilis = new Discord.MessageEmbed()
      .setColor(settings.yardim)
      .setAuthor(client.user.username, client.user.avatarURL())
      .setTitle("Çekiliş Komutları :")
      .addField("/Çekiliş başlat [kazanan sayısı] [süre] [ödül]", "Çekiliş Başlatırsınız.")
      .addField("/Çekiliş sil [mesaj ID]", "Bir Çekilişi Silersiniz.")
      .addField("/Çekiliş end [mesaj ID]", "Bir Çekilişi Sonlandırırsınız.")
      .addField("/Çekiliş reroll [mesaj ID]", "Bir Çekilişinin Kazananını Yeniden Belirlersiniz.")
      .setFooter("Veison BOT")
      .setTimestamp() ; 
    message.channel.send(cekilis);
    return
  };    
  
  if (args[0] === "bilgi") {
    let bilgiembed = new Discord.MessageEmbed()
      .setColor(settings.yardim)
      .setAuthor(client.user.username, client.user.avatarURL())
      .setTitle("Bilgi Komutları :")
      .addField("/Bug - /Öneri [mesaj]", "Botla İlgili Bug veya Öneri Gönderirsiniz.")
      .addField("/Davet", "Botun Davet Linkini ve Destek Sunucusunu Gönderir.")
      .addField("/Yardım", "Komutları Görmenize Yardımcı Olur.")
      .addField("/İstatistik", "Botun İstatistiklerini Listeler.")
      .setFooter("Veison BOT")
      .setTimestamp();
    message.channel.send(bilgiembed);
    return
  };
  
  if (args[0] === "genel") {
    let genelembed = new Discord.MessageEmbed()
      .setColor(settings.yardim)
      .setAuthor(client.user.username, client.user.avatarURL())
      .setTitle("Genel Komutlar :")
      .addField("/Avatar @kullanıcı", "Etiketlediğiniz Kişinin veya Kendinizin Avatarını Gösterir.")
      .addField("/İşlem [Matematik İşlemi]", "Bota Matematik İşlemi Yaptırırsınız.")
      .addField("/Kullanıcıbilgi @etiket / [ID]", "Etiketlediğiniz Kişinin veya Kendinizin Bilgilerini Gönderir.")    
      .addField("/Sunucubilgi", "Sunucunun İstatistiklerini Görmenizi Sağlar.")
      .addField("/Sunucu-pp", "Komutun Kullanıldığı Sunucunun Görselini Atar.")    
      .setFooter("Veison BOT")
      .setTimestamp();
    message.channel.send(genelembed);
    return
  };    
    
  if (args[0] === "eğlence") {
    let eglenceembed = new Discord.MessageEmbed()
      .setColor(settings.yardim)
      .setAuthor(client.user.username, client.user.avatarURL())
      .setTitle("Eğlence Komutları :")
      .addField("/Ascii [Kelimeler]", "İstediğiniz Kelimeleri Ascii Olarak Yazdırır.")
      .addField("/Caz", "Lan Caz Yapma dersiniz.")
      .addField("/Cowsay [kelimeler]", "İstediğiniz Kelimeleri Bir İnek Söylüyormuş Gibi Yazdırır.")
      .addField("/Fbi", "FBİ Evinizi Basar.")
      .addField("/Kartopu @kullanıcı", "Etiketlediğiniz Kişiye Kartopu Atarsınız.")
      .addField("/Kedi", "Rastgele Kedi Fotoğrafı Atar.")
      .addField("/Keko [kelimeler]", "Yazdığınız Kelimeleri Keko Gibi Yazdırırsınız.")
      .addField("/Köpek", "Rastgele Köpek Fotoğrafı Atar.")
      .addField("/Simetrik [kelimeler]", "İstediğiniz Kelimeleri Bota Simetrik Bir Şekilde Yazdırır.")
      .addField("/Slot", "Slot Çevirirsiniz.")
      .addField("/Ters [kelimeler]", "İstediğiniz Kelimeleri Ters Olarak Yazdırır.")
      .addField("/Napim", "Napim Diyip Lafı Koyarsınız 😎.")
      .addField("/Yaz [kelimeler]", "İstediğiniz Kelimeleri Bota Yazdırır.")
      .addField("/Yodasay [kelimeler]", "İstediğiniz Kelimeleri Yoda Tarafından Yazılmış Gibi Yazdırır.")
      .addField("/Youtube", "Aynı Ses Kanalında Beraber Video İzlemenizi Sağlar.")
      .addField("/Fishington", "Aynı Ses Kanalında Beraber Oyun Oynamanızı Sağlar.")
      .addField("/LoL [Sunucu] [Nick] ", "Nickini ve Sunucusunu Girdiğiniz Kişinin İstatistiklerini Gösterir.")
      .addField("/Mcskin [nick]", "Nickini Girdiğiniz Kişinin Minecrafttaki Skinini Gösterir.")    
      .setFooter("Veison BOT")
      .setTimestamp();
    message.channel.send(eglenceembed);
    return
  };
  
  if (!args[0]) {
    let kategori = new Discord.MessageEmbed()
      .setColor(settings.yardim)
      .setAuthor(client.user.username, client.user.avatarURL())
      .setTitle("Yardım Kategorileri :")
      .addField("/Yardım moderasyon", "Moderasyon ile ilgili komutları listeler.")
      .addField("/Yardım çekiliş", "Çekiliş komutları hakkında bilgi edinirsiniz.")
      .addField("/Yardım bilgi", "Botun hakkında bilgi içeren komutları listeler.")
      .addField("/Yardım genel", "Genel komutlar hakkında bilgi edinirsiniz.")
      .addField("/Yardım eğlence", "Eğlence amaçlı olan komutları listeler.")
      .setFooter("Veison BOT")
      .setTimestamp();
    message.channel.send(kategori);
    return  
  };
  
};

exports.conf = {
  enabled: true,
  guldOnly: false,
  aliases: ["help","yardım"],
  permlevel: 0
};

exports.help = {
  name: "Yardım",
  description: "Tüm Komutların Listesini Gönderir.",
  usage: "/Yardım"
};