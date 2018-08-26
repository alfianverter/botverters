const Discord = require("discord.js");
const helmet = require("../playerequipment/helm.json");
const chest = require("../playerequipment/chest.json");
const leg = require("../playerequipment/legs.json");
const weapon = require("../playerequipment/weapon.json");
const botconfig = require("../botconfig.json");
const purple = botconfig.purple;

module.exports.run = async (bot, message, args) => {

  if(!helmet[message.author.id]) helmet[message.author.id] = {
    helmet: "None"
  }
  let uHelmet = helmet[message.author.id].helmet;

  if(!chest[message.author.id]) chest[message.author.id] = {
    chest: "None"
  }
  let uChest = chest[message.author.id].chest;

  if(!leg[message.author.id]) leg[message.author.id] = {
    legs: "None"
  }
  let uLeg = leg[message.author.id].legs;

  if(!weapon[message.author.id]) weapon[message.author.id] = {
    weapon: "None"
  }
  let uWep = weapon[message.author.id].weapon;

  let equipEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor(purple)
  .setDescription("**Equipment**")
  .addField("Helmet", uHelmet)
  .addField("Chestplate", uChest)
  .addField("Legs", uLeg)
  .addField("Weapon", uWep);

  message.channel.send(equipEmbed);

}

module.exports.help = {
  name: "equipment"
}
