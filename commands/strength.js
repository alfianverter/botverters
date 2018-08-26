const Discord = require("discord.js");
const fs = require("fs");
const strength = require("../playerstats/strength.json");
const botconfig = require("../botconfig.json");
const questL = require("../questhandler/questcompleted.json");
const purple = botconfig.purple;

module.exports.run = async (bot, message, args) => {

  if(!strength[message.author.id]){
    strength[message.author.id] = {
      level: 1,
      xp: 0
    };
  }

  let sLvl = strength[message.author.id].level;
  let sxp = strength[message.author.id].xp;

  if(!questL[message.author.id]){
    questL[message.author.id] = {
      quest: "1"
    };
  }

  if(sLvl >= 15 && questL[message.author.id].quest === "7"){
    questL[message.author.id] = {
      quest: "8"
    };

    fs.writeFile("./questhandler/questcompleted.json", JSON.stringify(questL),  (err) => {
      if (err) console.log(err)
    });
  }
  let nxtLvl = sLvl * 300;
  let xpleft = nxtLvl - sxp;
  let sEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor(purple)
  .setTitle("💪Strength level and XP")
  .addField("Level", sLvl, true)
  .addField("XP", sxp, true)
  .setFooter(`${xpleft} XP left to next level.`, `${message.author.displayAvatarURL}`);
  message.delete();
  message.channel.send(sEmbed).then(msg => {msg.delete(5000)});

}

module.exports.help = {
  name: "strength"
}
