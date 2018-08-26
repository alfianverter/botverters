const Discord = require("discord.js");
const fs = require("fs");
const strength = require("../playerstats/strength.json");
const botconfig = require("../botconfig.json");
const questL = require("../questhandler/questcompleted.json");
const fishL = require("../playerstats/fishing.json");
const fishInv = require("../playerinventory/fish.json");
const mineInv = require("../playerinventory/ore.json");
const woodInv = require("../playerinventory/wood.json");
const meatInv = require("../playerinventory/meat.json");
const coins = require("../playerequipment/coins.json");
const purple = botconfig.purple;

module.exports.run = async (bot, message, args) => {
  message.delete();
  if(!args[0] || isNaN(args[1])){
    let sellembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(purple)
    .setTitle("Prices")
    .addField("🌲Wood", "3 Coins Each")
    .addField("⛏Ore", "7 Coins Each")
    .addField("🍖Meat", "9 Coins Each")
    .addField("🐟Fish", "5 Coins Each");

    return message.channel.send(sellembed).then(msg => {msg.delete(5000)})
  }

  let number = args[1];
  let price = number * 5;

  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }
  let curcoins = coins[message.author.id].coins;

  if(args[0] === "fish"){

  if(!fishInv[message.author.id]) return message.reply("You have nothing to sell.");
  let curfish = fishInv[message.author.id].fish;
  if(number > curfish) return message.reply("You don't have that many to sell.").then(msg => {msg.delete(5000)});
  fishInv[message.author.id].fish = curfish - number;
  fs.writeFile("./playerinventory/fish.json", JSON.stringify(fishInv),  (err) => {
    if (err) console.log(err)
  });
  coins[message.author.id].coins = curcoins + price;
  fs.writeFile("./playerequipment/coins.json", JSON.stringify(coins),  (err) => {
    if (err) console.log(err)
  });

  let sellembed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setTitle("Sold Fish!")
  .setColor(purple)
  .addField("🐟Amount Sold", number, true)
  .addField("💰Coins Gained", price, true);

  return message.channel.send(sellembed).then(msg => {msg.delete(5000)});
  }

  if(args[0] === "ore"){
    let ore_price = number * 7;
    if(!mineInv[message.author.id]) return message.reply("You have nothing to sell.");
    let curore = mineInv[message.author.id].ore;
    if(number > curore) return message.reply("You don't have that many to sell.").then(msg => {msg.delete(5000)});
    mineInv[message.author.id].ore = curore - number;
    fs.writeFile("./playerinventory/ore.json", JSON.stringify(mineInv),  (err) => {
      if (err) console.log(err)
    });
    coins[message.author.id].coins = curcoins + ore_price;
    fs.writeFile("./playerequipment/coins.json", JSON.stringify(coins),  (err) => {
      if (err) console.log(err)
    });

    let sellembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setTitle("Sold Ores!")
    .setColor(purple)
    .addField("⛏Amount Sold", number, true)
    .addField("💰Coins Gained", ore_price, true);

    return message.channel.send(sellembed).then(msg => {msg.delete(5000)});
  }

  if(args[0] === "wood"){
    let wood_price = number * 3;
    if(!woodInv[message.author.id]) return message.reply("You have nothing to sell.");
    let curwood = woodInv[message.author.id].wood;
    if(number > curwood) return message.reply("You don't have that many to sell.").then(msg => {msg.delete(5000)});
    woodInv[message.author.id].wood = curwood - number;
    fs.writeFile("./playerinventory/wood.json", JSON.stringify(woodInv),  (err) => {
      if (err) console.log(err)
    });
    coins[message.author.id].coins = curcoins + wood_price;
    fs.writeFile("./playerequipment/coins.json", JSON.stringify(coins),  (err) => {
      if (err) console.log(err)
    });

    let sellembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setTitle("Sold Wood!")
    .setColor(purple)
    .addField("🌲Amount Sold", number, true)
    .addField("💰Coins Gained", wood_price, true);

    return message.channel.send(sellembed).then(msg => {msg.delete(5000)});
  }

  if(args[0] === "meat"){
    let meat_price = number * 9;
    if(!meatInv[message.author.id]) return message.reply("You have nothing to sell.");
    let curmeat = meatInv[message.author.id].meat;
    if(number > curmeat) return message.reply("You don't have that many to sell.").then(msg => {msg.delete(5000)});
    meatInv[message.author.id].meat = curmeat - number;
    fs.writeFile("./playerinventory/meat.json", JSON.stringify(meatInv),  (err) => {
      if (err) console.log(err)
    });
    coins[message.author.id].coins = curcoins + meat_price;
    fs.writeFile("./playerequipment/coins.json", JSON.stringify(coins),  (err) => {
      if (err) console.log(err)
    });

    let sellembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setTitle("Sold Meat!")
    .setColor(purple)
    .addField("🍖Amount Sold", number, true)
    .addField("💰Coins Gained", meat_price, true);

    return message.channel.send(sellembed).then(msg => {msg.delete(5000)});
  }


}

module.exports.help = {
  name: "sell"
}
