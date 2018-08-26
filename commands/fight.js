const Discord = require("discord.js");
const fs = require("fs");
const coins = require("../playerequipment/coins.json");
const playerclasses = require("../classhandler/playerclasses.json");
const strength = require("../playerstats/strength.json");
const questL = require("../questhandler/questcompleted.json");
const wins = require("../fightlog/wins.json");
const loses = require("../fightlog/loses.json");
const botconfig = require("../botconfig.json");
const purple = botconfig.purple;
const nedid = botconfig.nedid;

module.exports.run = async (bot, message, args) => {

  let fMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!fMember) return message.reply("oof").then(msg => {msg.delete(5000)});
  if(fMember.id === message.author.id) return message.reply("Quit hitting yourself, stupid!");
  if(fMember.id === bot.user.id) return message.reply("I put down my sword long ago.");
  if(!questL[message.author.id]){
    questL[message.author.id] = {
      quest: "1"
    };
  }
  if(!wins[message.author.id]){
    wins[message.author.id] = {
      wins: 0
    };
  }
  if(wins[message.author.id].wins >= 10 && questL[message.author.id].quest === "6"){
    questL[message.author.id] = {
      quest: "7"
    };
    fs.writeFile("./questhandler/questcompleted.json", JSON.stringify(questL),  (err) => {
      if (err) console.log(err)
    });
  }


  if(fMember.id === nedid){
    if(!questL[message.author.id]){
      questL[message.author.id] = {
        quest: "1"
      };
    }
    if(questL[message.author.id].quest == "2"){
      questL[message.author.id] = {
        quest: "3"
      };
      fs.writeFile("./questhandler/questcompleted.json", JSON.stringify(questL),  (err) => {
        if (err) console.log(err)
      });

    }
  }

  if(!strength[message.author.id]){
    strength[message.author.id] = {
      level: 1,
      xp: 0
    };
    fs.writeFile("./playerstats/strength.json", JSON.stringify(strength),  (err) => {
      if (err) console.log(err)
    });
  }

  if(!strength[fMember.id]){
    strength[fMember.id] = {
      level: 1,
      xp: 0
    };
    fs.writeFile("./playerstats/strength.json", JSON.stringify(strength),  (err) => {
      if (err) console.log(err)
    });

  }

  let sLvl = strength[message.author.id].level;
  let fLvl = strength[fMember.id].level;
  let sXp = strength[message.author.id].xp;
  let fXp = strength[fMember.id].xp;
  let nxtSLvl = sLvl * 300;
  let nxtFLvl = fLvl * 300;
  let chance = Math.ceil(Math.random() * 100);
  console.log(chance);
  let difference = (sLvl - fLvl) / 2;
  let calcChance = chance - difference;
  console.log(`Difference is ${difference}`)
  console.log(`new chance ${calcChance}`);


  if(sXp >= nxtSLvl){
    strength[message.author.id].level = sLvl + 1;
    fs.writeFile("./playerstats/strength.json", JSON.stringify(strength),  (err) => {
      if (err) console.log(err)
    });
    message.channel.send(`Congrats ${message.author}! You have leveled up to level ${sLvl + 1}`);
  }

  if(fXp >= nxtFLvl){
    strength[fMember.id].level = fLvl + 1;
    fs.writeFile("./playerstats/strength.json", JSON.stringify(strength),  (err) => {
      if (err) console.log(err)
    });
    message.channel.send(`Congrats ${fMember}! You have leveled up to level ${fLvl + 1}`);
  }

  if(calcChance > 40){
    if(!wins[fMember.id]){
      wins[fMember.id] = {
        wins: 0
      };
    }
    wins[fMember.id] = {
      wins: wins[fMember.id].wins + 1
    }

    fs.writeFile("./fightlog/wins.json", JSON.stringify(wins),  (err) => {
      if (err) console.log(err)
    });

    if(!loses[message.author.id]){
      loses[message.author.id] = {
        loses: 0
      };
    }
    loses[message.author.id] = {
      loses: loses[message.author.id].loses + 1
    };

    fs.writeFile("./fightlog/loses.json", JSON.stringify(loses),  (err) => {
      if (err) console.log(err)
    });
    let fightembed = new Discord.RichEmbed()
    .setTitle("✊ FIGHT!")
    .setColor(purple)
    .setThumbnail(fMember.user.displayAvatarURL)
    .addField("Winner", fMember)
    .addField("Loser", message.author)
    .addField("Level", fLvl)
    .addField("XP", fXp);

    strength[fMember.id].xp = fXp + chance;
    fs.writeFile("./playerstats/strength.json", JSON.stringify(strength),  (err) => {
      if (err) console.log(err)
    });

    message.delete();
    return message.channel.send(fightembed);

  }else if(calcChance <= 40){
    if(!questL[message.author.id]){
      questL[message.author.id] = {
        quest: "1"
      };
    }
    if(questL[message.author.id].quest == "4"){
      questL[message.author.id] = {
        quest: "5"
      };
      fs.writeFile("./questhandler/questcompleted.json", JSON.stringify(questL),  (err) => {
        if (err) console.log(err)
      });

    }

    if(!wins[message.author.id]){
      wins[message.author.id] = {
        wins: 0
      };
    }
    wins[message.author.id] = {
      wins: wins[message.author.id].wins + 1
    }

    fs.writeFile("./fightlog/wins.json", JSON.stringify(wins),  (err) => {
      if (err) console.log(err)
    });

    if(!loses[fMember.id]){
      loses[fMember.id] = {
        loses: 0
      };
    }
    loses[fMember.id] = {
      loses: loses[fMember.id].loses + 1
    };

    fs.writeFile("./fightlog/loses.json", JSON.stringify(loses),  (err) => {
      if (err) console.log(err)
    });



    let fightembed = new Discord.RichEmbed()
    .setTitle("✊ FIGHT!")
    .setColor(purple)
    .setThumbnail(message.author.displayAvatarURL)
    .addField("Winner", message.author)
    .addField("Loser", fMember)
    .addField("Level", sLvl)
    .addField("XP", sXp);
    message.delete();


    strength[message.author.id].xp = sXp + chance;
    fs.writeFile("./playerstats/strength.json", JSON.stringify(strength),  (err) => {
    if (err) console.log(err)
  });

    return message.channel.send(fightembed);

  }
}


module.exports.help = {
  name: "fight"
}
