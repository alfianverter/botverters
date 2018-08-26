const Discord = require("discord.js");
const fs = require("fs");
const price = require("../storedata/prices.json");
const botconfig = require("../botconfig.json");
const purple = botconfig.purple;
const green = botconfig.green;
const red = botconfig.red;

module.exports.run = async (bot, message, args) => {

  if(!args[0]) return message.reply("Please enter an item name (find those by !shop) in to find out its price.");
  let iprice = price[args[0]];
  message.delete();
  if(!iprice){
    let errorem = new Discord.RichEmbed()
    .setTitle(message.author.username)
    .setColor(red)
    .addField("Error ", `Couldn't find ${args[0]}`);

    return message.channel.send(errorem).then(msg => {msg.delete(5000)});
  }

  let pembed = new Discord.RichEmbed()
  .setTitle(message.author.username)
  .setColor(purple)
  .addField("Price 💰", `${iprice} coins`);

  message.channel.send(pembed).then(msg => {msg.delete(5000)});

}

module.exports.help = {
  name: "price"
}
