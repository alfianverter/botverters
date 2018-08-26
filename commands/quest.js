const Discord = require("discord.js");
const questL = require("../questhandler/questcompleted.json");
const questN = require("../questhandler/questlist.json");
const botconfig = require("../botconfig.json");
const purple = botconfig.purple;
const green = botconfig.green;


module.exports.run = async (bot, message, args) => {

  if(!questL[message.author.id]) questL[message.author.id] = {
    quest: "1"
  };
  let questlvl = questL[message.author.id].quest;

  let quest = questN[questlvl];

  let questEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor(green)
  .addField(`Quest: ${questlvl}`, `Quest Name: ${quest}`);

  message.channel.send(questEmbed);



}

module.exports.help = {
  name: "quest"
}
