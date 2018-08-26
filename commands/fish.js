const Discord = require("discord.js");
const fs = require("fs");
const strength = require("../playerstats/strength.json");
const botconfig = require("../botconfig.json");
const questL = require("../questhandler/questcompleted.json");
const fishL = require("../playerstats/fishing.json");
const fishInv = require("../playerinventory/fish.json");
const purple = botconfig.purple;

module.exports.run = async (bot, message, args) => {

  if(!fishL[message.author.id]){
  fishL[message.author.id] = {
    level: 1,
    xp: 0
    };
  }
  if(!fishInv[message.author.id]){
    fishInv[message.author.id] = {
      fish: 0
    };
  }

  let curLevel = fishL[message.author.id].level;
  let curxp = fishL[message.author.id].xp;
  let curfish = fishInv[message.author.id].fish;
  let chance = Math.ceil(Math.random() * 100);
  let xpgained = Math.ceil(Math.random() * 15);
  let fishgained = Math.floor(Math.random() * 3);
  let nxtLvl = curLevel * 300;
  let xpleft = nxtLvl - curxp;

  message.delete();

  if(fishgained === 0){
    let failembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(botconfig.red)
    .addField("Sorry", "You failed to catch any fish.");
    return message.channel.send(failembed).then(msg => {msg.delete(5000)});
  }

  fishInv[message.author.id].fish = curfish + fishgained;
  fs.writeFile("./playerinventory/fish.json", JSON.stringify(fishInv),  (err) => {
    if (err) console.log(err)
  });



  fishL[message.author.id].xp = curxp + xpgained;
  fs.writeFile("./playerstats/fishing.json", JSON.stringify(fishL),  (err) => {
  if (err) console.log(err)
});

  if(fishL[message.author.id].xp >= nxtLvl){

    fishL[message.author.id].level = curLevel + 1;
    fs.writeFile("./playerstats/fishing.json", JSON.stringify(fishL),  (err) => {
      if (err) console.log(err)
    });
    let lvlup = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(botconfig.green)
    .addField("🐟Level Up!", `You are now level ${curLevel + 1} fishing.` );

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }

  let fishembed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setTitle("🐟Fish Caught!")
  .setColor(botconfig.purple)
  .addField("Fish Caught", `${fishgained} fish caught.`, true)
  .addField("XP Gained", xpgained, true)
  .setFooter(`${xpleft} to next level`, message.author.displayAvatarURL);

  message.channel.send(fishembed).then(msg => {msg.delete(5000)});

}

module.exports.help = {
  name: "fish"
}
