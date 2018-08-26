const Discord = require("discord.js");
const fs = require("fs");
const coins = require("../playerequipment/coins.json");
const botconfig = require("../botconfig.json");
const purple = botconfig.purple;
const green = botconfig.green;

module.exports.run = async (bot, message, args) => {

if(!coins[message.author.id]){
  coins[message.author.id] = {
  coins: 0
  };
  return message.reply(`Sorry, you have ${coins[message.author.id].coins} coins.`);
}

if(isNaN(args[1])) return message.reply("That doesnt seem right....")
if(coins[message.author.id].coins < args[2]) return message.reply(`Sorry, you only have ${coins[message.author.id].coins} coins.`);


let mentUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!mentUser) return message.reply("Usage: !coins pay [@user] [amount]");
if(message.author.id === mentUser.id) return message.reply("Can't pay yourself");
if(!coins[mentUser.id]){
  coins[mentUser.id] = {
    coins: 0
  }
}
let uCoins = coins[message.author.id].coins;
let mCoins = coins[mentUser.id].coins;
if(uCoins < args[1]) return message.reply("You don't have enough coins.");
if(args[1] < 1) return message.reply("whoops");
if(!args[1]) return message.reply("Usage: r?coins pay [@user] [amount]");

coins[message.author.id] = {
coins: uCoins - parseInt(args[1])
};
coins[mentUser.id] = {
coins: mCoins + parseInt(args[1])
};

fs.writeFile("./playerequipment/coins.json", JSON.stringify(coins), (err) => {
  if (err) console.log(err)
});
message.channel.send(`${mentUser} has been given ${args[1]} coins from ${message.author}`);

}

module.exports.help = {
  name: "pay"
}
