const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const purple = botconfig.purple;
const green = botconfig.green;

module.exports.run = async (bot, message, args) => {

  let helpEmbed = new Discord.RichEmbed()
  .setColor(purple)
  .setDescription("Prefix: !")
  .addField("Skill Commands", "fish, chop, mine, hunt")
  .addField("Currency Commands", "buy, pay, coins, shop")
  .addField("Equipment Commands", "equipment")
  .addField("Quest Commands", "quest")
  .addField("PVP Commands", "fight, strength, wins")
  .addField("Class Commands", "class");

  message.channel.send(helpEmbed);

}

module.exports.help = {
  name: "help"
}
