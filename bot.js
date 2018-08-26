const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
let coins = require("./playerequipment/coins.json");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let cooldown = new Set();
const chratis_cooldown_time = 5;

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity(`an awesome RPG game on ${bot.guilds.size} guilds.`, {type: "PLAYING"});

});

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let prefix = botconfig.prefix;
  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    let cdembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(botconfig.red)
    .addField("❌Error", "You need to wait 5 secs between commands.");
    return message.channel.send(cdembed).then(msg => {msg.delete(3000)});1
  }
  if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  }
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(!coins[message.author.id]) coins[message.author.id] = {
    coins: 0
  };

  let chancenum = Math.floor(Math.random()* 15);
  let onnum = Math.floor(Math.random() * 15);
  if(chancenum === onnum){
    let coinamount = chancenum + 1;
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinamount
    };
    let coinsembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(botconfig.purple)
    .addField("💰", `${coinamount} coins added!`);
    message.channel.send(coinsembed).then(msg => msg.delete(5000));
    console.log(`${coinamount} coins added to ${message.author.username}`);

    fs.writeFile("./playerequipment/coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log(err)
    });

  }

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  setTimeout(() => {
    cooldown.delete(message.author.id);
}, chratis_cooldown_time * 1000);

});
//brb, you guys are stuck w daeshan
bot.login(botconfig.token);
