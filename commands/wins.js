const Discord = require("discord.js");
const fs = require("fs");
const coins = require("../playerequipment/coins.json");
const playerclasses = require("../classhandler/playerclasses.json");
const wins = require("../fightlog/wins.json");
const loses = require("../fightlog/loses.json");
const botconfig = require("../botconfig.json");
const purple = botconfig.purple;

module.exports.run = async (bot, message, args) => {

  if(!wins[message.author.id]){
    wins[message.author.id] = {
      wins: 0
    };
  }

  if(!loses[message.author.id]){
    loses[message.author.id] = {
      loses: 0
    };
  }

  let winloss = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor(purple)
  .addField("🎉Wins", wins[message.author.id].wins)
  .addField("😿Losses", loses[message.author.id].loses);

  message.channel.send(winloss).then(msg => {msg.delete(5000)});


}

module.exports.help = {
  name: "wins"
}
