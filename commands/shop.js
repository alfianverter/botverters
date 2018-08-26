const Discord = require("discord.js");
const fs = require("fs");
const coins = require("../playerequipment/coins.json");
const botconfig = require("../botconfig.json");
const purple = botconfig.purple;
const green = botconfig.green;
const red = botconfig.red;

module.exports.run = async (bot, message, args) => {

  let shopEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setTitle("The Shop")
  .setDescription("Use !buy <itemname> to buy desired item")
  .setColor(purple)
  .addField("Helms", "beginnerhelm, bronzehelm, ironhelm, diamondhelm, magichelm")
  .addField("Chest", "beginnerchest, bronzechest, ironchest, diamondchest, magicchest")
  .addField("Legs", "beginnerleg, bronzeleg, ironleg, diamondleg, magicleg")
  .addField("Swords", "beginnersword, bronzesword, ironsword, diamondsword, magicsword")
  .addField("Bows", "beginnerbow, oakbow, maplebow, yewbow, magicbow");
  message.delete();
  message.channel.send(shopEmbed).then(msg => {msg.delete(10000)});

}

module.exports.help = {
  name: "shop"
}
