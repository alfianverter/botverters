const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const playerclasses = require("../classhandler/playerclasses.json");
const questN = require("../questhandler/questcompleted.json");
const fs = require("fs");
const purple = botconfig.purple;

module.exports.run = async (bot, message, args) => {

  if(playerclasses[message.author.id]){
    return message.reply(`You already picked a class: ${playerclasses[message.author.id].class}`)
  }

  if(!args[0]) return message.reply("!class <warrior/archer>");
  if(args[0] == "warrior"){
    if(playerclasses[message.author.id]) return message.reply(`You already picked the ${playerclasses[message.author.id].class} class!`);
    if(!playerclasses[message.author.id]) playerclasses[message.author.id] = {
      class: "warrior"
    };
    fs.writeFile("./classhandler/playerclasses.json", JSON.stringify(playerclasses), (err) => {
      if (err) console.log(err)
    });
    questN[message.author.id] = {
      quest: "2"
    };
    fs.writeFile("./questhandler/questcompleted.json", JSON.stringify(questN), (err) => {
      if(err) console.log(err)
    });
    return message.reply(`You have picked the class **Warrior**`);

  }
  if(args[0] == "archer"){
    if(playerclasses[message.author.id]) return message.reply(`You already picked the ${playerclasses[message.author.id].class} class!`);
    if(!playerclasses[message.author.id]) playerclasses[message.author.id] = {
      class: "archer"
    };
    fs.writeFile("./classhandler/playerclasses.json", JSON.stringify(playerclasses), (err) => {
      if (err) console.log(err)
    });
    questN[message.author.id] = {
      quest: "2"
    }
    fs.writeFile("./questhandler/questcompleted.json", JSON.stringify(questN), (err) => {
      if(err) console.log(err)
    });
    return message.reply(`You have picked the class **Archer**`);
  }

}

module.exports.help = {
  name: "class"
}
