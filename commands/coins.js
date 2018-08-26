const Discord = require("discord.js");
const fs = require("fs");
const coins = require("../playerequipment/coins.json");
const botconfig = require("../botconfig.json");
const purple = botconfig.purple;
const green = botconfig.green;

module.exports.run = async (bot, message, args) => {

  if(!coins[message.author.id]) coins[message.author.id] = {
    coins: 0
  };

  let uCoins = coins[message.author.id].coins;

  if(!args[1]){
    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(green)
    .setThumbnail(message.author.displayAvatarURL)
    .addField("Coins", uCoins);
    return message.channel.send(coinEmbed);
  }

  // if(args[0] === "giveall"){
  //   if(!message.member.hasPermission("ADMINISTRATOR")) return;
  //
  //   return;
  // }

  if(args[0] === "set"){
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    let mentUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
    if(!mentUser) return message.reply("Usage: r?coins set [@user] [amount]");
    let coinAmt = parseInt(args[2]);

    coins[mentUser.id] = {
      coins: coinAmt
    };
    fs.writeFile("./playerequipment/coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log(err)
    });
    message.reply(`Coins of ${mentUser} has been set to ${coins[mentUser.id].coins}`);

    return
  }

}

module.exports.help = {
  name: "coins"
}
