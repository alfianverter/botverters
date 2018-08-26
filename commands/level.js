const Discord = require("discord.js");
const fs = require("fs");
const strength = require("../playerstats/strength.json");
const botconfig = require("../botconfig.json");
const questL = require("../questhandler/questcompleted.json");
const fishL = require("../playerstats/fishing.json");
const mineL = require("../playerstats/mining.json");
const wclvl = require("../playerstats/woodcutting.json");
const hlvl = require("../playerstats/hunting.json");
const fishInv = require("../playerinventory/fish.json");
const purple = botconfig.purple;

module.exports.run = async (bot, message, args) => {

  if(!fishL[message.author.id]){
    fishL[message.author.id] = {
      level: 1,
      xp: 0
    };
  }

  if(!mineL[message.author.id]){
    mineL[message.author.id] = {
      level: 1,
      xp: 0
    }
  }

  if(!wclvl[message.author.id]){
    wclvl[message.author.id] = {
      level: 1,
      xp: 0
    }
  }

  if(!hlvl[message.author.id]){
    hlvl[message.author.id] = {
      level: 1,
      xp: 0
    }
  }

  message.delete();
  let flvl = fishL[message.author.id].level;
  let mlvl = mineL[message.author.id].level;
  let woodlvl = wclvl[message.author.id].level;
  let huntlvl = hlvl[message.author.id].level;
  let lvlembed = new Discord.RichEmbed()
  .setTitle("Levels")
  .setThumbnail(message.author.displayAvatarURL)
  .setAuthor(message.author.username)
  .setColor(purple)
  .addField("🐟Fishing Level", flvl, true)
  .addField("⛏Mining Level", mlvl, true)
  .addField("🌲Woodcutting Level", woodlvl, true)
  .addField("🍖Hunting Level", huntlvl, true);

  message.channel.send(lvlembed).then(msg => {msg.delete(5000)});

}

module.exports.help = {
  name: "level"
}
