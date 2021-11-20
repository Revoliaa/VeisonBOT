//Modüller
const Discord = require('discord.js');
const request = require("snekfetch");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => {
  
    try {
		request.get("https://aws.random.cat/meow").then(res => {
			const embed = new Discord.MessageEmbed()
          		.setColor(settings.eglence)        
          		.setAuthor(client.user.username, client.user.avatarURL())
          		.setTitle("Ne kadar tatlı değil mi :cat:")
				.setImage(res.body.file)
			return message.channel.send(embed);
		});
	}
    catch(err) {
			return message.channel.send(err.stack);
	};
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kedi", "cat"],
  permLevel: 0
};

exports.help = {
  name: "Kedi",
  description: "Rastgele Kedi Fotoğrafı Atar.",
  usage: "/Kedi"
};