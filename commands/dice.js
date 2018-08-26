const d = require ("discord.js");
const fs = require ("fs");
const coins = require("../playerequipment/coins.json");
module.exports.run = async (bot, message, args) => {
	var result = Math.floor((Math.random() * 6) + 1);
	const embed = new d.RichEmbed()

	.setTitle()
	.setColor("BLUE")
	.addField("You rolled a...", result, true)
	.setTimestamp()
	.setThumbnail('http://moziru.com/images/dice-clipart-7.png')

	msg.channel.send(embed)

	if (die === 3) {
		msg.channel.send("You earned 2 coins! 🤑");

		if (!coins[msg.author.id]) {
			coins[msg.author.id] = {
				coins: 0
			};
		}

	let cmamout = 2;
	if (coins[msg.author.id]) {
		coins[msg.author.id] = {
			coins: test[msg.author.id].coins + cmamout
		};
		fs.writeFileSync('../playerequipment/coins.json', JSON.stringify(test), (err) => {
			if (err) console.log(err);
		});
}
	}
}

module.exports.help = {
  name: "buy"
}
