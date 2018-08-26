const Discord = require("discord.js");
const fs = require("fs");
const botconfig = require("../botconfig.json");
const questL = require("../questhandler/questcompleted.json");
const wcLvl = require("../playerstats/woodcutting.json");
const wood = require("../playerinventory/wood.json");
const purple = botconfig.purple;

module.exports.run = async (bot, message, args) => {

  if(!wcLvl[message.author.id]){
    wcLvl[message.author.id] = {
      level: 1,
      xp: 0
    };
  }

  if(!wood[message.author.id]){
    wood[message.author.id] = {
      wood: 0
    };
  }

  let curlvl = wcLvl[message.author.id].level;
  let curxp = wcLvl[message.author.id].xp;
  let curwood = wood[message.author.id].wood;
  let chance = Math.ceil(Math.random() * 100);
  let woodgained = Math.floor(Math.random() * 5);
  let xpgained = (Math.ceil(Math.random() * 15) * woodgained);
  let nxtLvl = curlvl * 300;
  let xpleft = nxtLvl - curxp;

  message.delete();

  if(woodgained === 0){
    let failembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(botconfig.red)
    .setTitle("🌲Failed to get any wood.")
    .addField("Sorry!", "+0 wood.");

    return message.channel.send(failembed).then(msg => {msg.delete(5000)})
  }

  wood[message.author.id].wood = curwood + woodgained;
  fs.writeFile("./playerinventory/wood.json", JSON.stringify(wood),  (err) => {
    if (err) console.log(err)
  });

  wcLvl[message.author.id].xp = curxp + xpgained;

  fs.writeFile("./playerstats/woodcutting.json", JSON.stringify(wcLvl),  (err) => {
  if (err) console.log(err)
});

if(wcLvl[message.author.id].xp >= nxtLvl){

  wcLvl[message.author.id].level = curlvl + 1;
  fs.writeFile("./playerstats/woodcutting.json", JSON.stringify(wcLvl),  (err) => {
    if (err) console.log(err)
  });
  let lvlup = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor(botconfig.green)
  .addField("🌲Level Up!", `You are now level ${curlvl + 1} woodcutting.` );

  message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }

  let woodembed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setTitle("🌲Wood Chopped!")
  .setColor(botconfig.purple)
  .addField("Wood Chopped", `${woodgained} wood chopped.`, true)
  .addField("XP Gained", xpgained, true)
  .setFooter(`${xpleft} to next level`, message.author.displayAvatarURL);

  message.channel.send(woodembed).then(msg => {msg.delete(5000)});

}

module.exports.help = {
  name: "chop"
}
