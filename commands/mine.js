const Discord = require("discord.js");
const fs = require("fs");
const strength = require("../playerstats/strength.json");
const botconfig = require("../botconfig.json");
const questL = require("../questhandler/questcompleted.json");
const fishL = require("../playerstats/fishing.json");
const mineL = require("../playerstats/mining.json");
const fishInv = require("../playerinventory/fish.json");
const ore = require("../playerinventory/ore.json");
const purple = botconfig.purple;

module.exports.run = async (bot, message, args) => {

  if(!mineL[message.author.id]){
    mineL[message.author.id] = {
      level: 1,
      xp: 0
    };
  }

  if(!ore[message.author.id]){
    ore[message.author.id] = {
      ore: 0
    };
  }

  let curlvl = mineL[message.author.id].level;
  let curxp = mineL[message.author.id].xp;
  let curore = ore[message.author.id].ore;
  let chance = Math.ceil(Math.random() * 100);
  let xpgained = Math.ceil(Math.random() * 15);
  let oregained = Math.floor(Math.random() * 3);
  let nxtLvl = curlvl * 300;
  let xpleft = nxtLvl - curxp;

  message.delete();

  if(oregained === 0){
    let failembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(botconfig.red)
    .setTitle("⛏Failed to get any ore.")
    .addField("Sorry!", "+0 ore.");

    return message.channel.send(failembed).then(msg => {msg.delete(5000)})
  }

  ore[message.author.id].ore = curore + oregained;
  fs.writeFile("./playerinventory/ore.json", JSON.stringify(ore),  (err) => {
    if (err) console.log(err)
  });

  mineL[message.author.id].xp = curxp + xpgained;
  fs.writeFile("./playerstats/mining.json", JSON.stringify(mineL),  (err) => {
  if (err) console.log(err)
});

if(mineL[message.author.id].xp >= nxtLvl){

  mineL[message.author.id].level = curlvl + 1;
  fs.writeFile("./playerstats/mining.json", JSON.stringify(mineL),  (err) => {
    if (err) console.log(err)
  });
  let lvlup = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor(botconfig.green)
  .addField("⛏Level Up!", `You are now level ${curlvl + 1} mining.` );

  message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }

  let mineembed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setTitle("⛏Ore Mined!")
  .setColor(botconfig.purple)
  .addField("Ores Mined", `${oregained} ores mined.`, true)
  .addField("XP Gained", xpgained, true)
  .setFooter(`${xpleft} to next level`, message.author.displayAvatarURL);

  message.channel.send(mineembed).then(msg => {msg.delete(5000)});

}

module.exports.help = {
  name: "mine"
}
