const Discord = require("discord.js");
const prices = require("../storedata/prices.json");
const names = require("../storedata/names.json");
const fs = require("fs");
const coins = require("../playerequipment/coins.json");
const questL = require("../questhandler/questcompleted.json");
const botconfig = require("../botconfig.json");
const purple = botconfig.purple;

module.exports.run = async (bot, message, args) => {

  let price = prices[args[0]];
  let item = names[args[0]];
  if(!price) return message.reply("Couldn't find that item.");

  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    }
  }

  if(!questL[message.author.id]){
    questL[message.author.id] = {
      quest: "1"
    }
  }

  if(questL[message.author.id].quest === "5" || args.includes("iron")){
    questL[message.author.id] = {
      quest: "6"
    };
    fs.writeFile("./questhandler/questcompleted.json", JSON.stringify(questL), (err) => {
      if (err) console.log(err)
    });
  }

  if(coins[message.author.id].coins < price) return message.reply("Sorry, you can't afford that.");
  let uCoins = coins[message.author.id].coins;
  coins[message.author.id] = {
  coins: uCoins - price
  };

  fs.writeFile("./playerequipment/coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });

  message.reply(`You have bought ${item} for ${price} coins.`);
  if(questL[message.author.id].quest === "3"){
    questL[message.author.id] = {
      quest: "4"
    };
    fs.writeFile("./questhandler/questcompleted.json", JSON.stringify(questL), (err) => {
      if (err) console.log(err)
    });
  }
  if(message.content.includes("sword") || message.content.includes("bow")){
    const weapon = require("../playerequipment/weapon.json");
    if(!weapon[message.author.id]) weapon[message.author.id] = {
      weapon: item
    };
    weapon[message.author.id] = {
      weapon: item
    };
    fs.writeFile("./playerequipment/weapon.json", JSON.stringify(weapon), (err) => {
      if (err) console.log(err)
    });
    message.reply(`${item} has been added to your inventory! You can equip it!`)
  }

  //helm equipment
  if(message.content.includes("helm")){
    const helmet = require("../playerequipment/helm.json");
    if(!helmet[message.author.id]) helmet[message.author.id] = {
      helmet: item
    };
    helmet[message.author.id] = {
      helmet: item
    };
    fs.writeFile("./playerequipment/helm.json", JSON.stringify(helmet), (err) => {
      if (err) console.log(err)
    });
    message.reply(`Equipped ${item}!`)
  }

  //chest
  if(message.content.includes("chest")){
    const chest = require("../playerequipment/chest.json");
    if(!chest[message.author.id]) chest[message.author.id] = {
      chest: item
    };
    chest[message.author.id] = {
      chest: item
    };
    fs.writeFile("./playerequipment/chest.json", JSON.stringify(chest), (err) => {
      if (err) console.log(err)
    });
    message.reply(`Equipped ${item}!`)
  }

  //Legs
  if(message.content.includes("leg")){
    const legs = require("../playerequipment/legs.json");
    if(!legs[message.author.id]) legs[message.author.id] = {
      legs: item
    };
    legs[message.author.id] = {
      legs: item
    };
    fs.writeFile("./playerequipment/legs.json", JSON.stringify(legs), (err) => {
      if (err) console.log(err)
    });
    message.reply(`Equipped ${item}!`)
  }

}

module.exports.help = {
  name: "buy"
}
