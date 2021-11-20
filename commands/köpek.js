//Modüller
const Discord = require('discord.js');
const request = require("snekfetch");
//Dosyalar
const settings = require("../settings.json");

exports.run = (client,message,args) => {
  
		try {
			request.get("https://dog.ceo/api/breeds/image/random").then(res => {
				const embed = new Discord.MessageEmbed()
          			.setColor(settings.eglence)        
          			.setAuthor(client.user.username, client.user.avatarURL())
          			.setTitle("Ne kadar tatlı değil mi :dog:")
					.setImage(res.body.message)
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
  aliases: ["köpek", "dog"],
  permLevel: 0
};

exports.help = {
  name: "Köpek",
  description: "Rastgele Köpek Fotoğrafı Atar.",
  usage: "/Köpek"
};