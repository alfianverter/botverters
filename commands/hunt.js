const Discord = require("discord.js");
const fs = require("fs");
const strength = require("../playerstats/strength.json");
const botconfig = require("../botconfig.json");
const questL = require("../questhandler/questcompleted.json");
const huntL = require("../playerstats/hunting.json");
const weapon = require("../playerequipment/weapon.json");
const meat = require("../playerinventory/meat.json");
const purple = botconfig.purple;

module.exports.run = async (bot, message, args) => {

  if(!huntL[message.author.id]){
    huntL[message.author.id] = {
      level: 1,
      xp: 0
    };
  }

  if(!meat[message.author.id]){
    meat[message.author.id] = {
      meat: 0
    };
  }

  if(!weapon[message.author.id]) return message.reply("You need a weapon to go hunting!");
  let uweapon = weapon[message.author.id].weapon;
  if(!uweapon.includes("Bow") || !uweapon.includes("Sword")) return message.reply("You need a weapon to go hunting!");

  let curlvl = huntL[message.author.id].level;
  let curxp = huntL[message.author.id].xp;
  let curmeat = meat[message.author.id].meat;
  let chance = Math.ceil(Math.random() * 110);
  let xpgained = Math.ceil(Math.random() * 15);
  let meatgained = Math.floor(Math.random() * 2);
  let nxtLvl = curlvl * 300;
  let xpleft = nxtLvl - curxp;

  message.delete();

  if(meatgained === 0){
    let failembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(botconfig.red)
    .setTitle("🍖Failed to get any meat.")
    .addField("Sorry!", "+0 meat.");

    return message.channel.send(failembed).then(msg => {msg.delete(5000)})
  }

  meat[message.author.id].meat = curmeat + meatgained;
  fs.writeFile("./playerinventory/meat.json", JSON.stringify(meat),  (err) => {
    if (err) console.log(err)
  });

  huntL[message.author.id].xp = curxp + xpgained;
  fs.writeFile("./playerstats/hunting.json", JSON.stringify(huntL),  (err) => {
  if (err) console.log(err)
});

if(huntL[message.author.id].xp >= nxtLvl){

  huntL[message.author.id].level = curlvl + 1;
  fs.writeFile("./playerstats/hunting.json", JSON.stringify(huntL),  (err) => {
    if (err) console.log(err)
  });
  let lvlup = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor(botconfig.green)
  .addField("🍖Level Up!", `You are now level ${curlvl + 1} hunting.` );

  message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }

  let mineembed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setTitle("🍖Hunted!")
  .setColor(botconfig.purple)
  .addField("Meat Collected", `${meatgained} meat collected.`, true)
  .addField("XP Gained", xpgained, true)
  .setFooter(`${xpleft} to next level`, message.author.displayAvatarURL);

  message.channel.send(mineembed).then(msg => {msg.delete(5000)});

}

module.exports.help = {
  name: "hunt"
}
