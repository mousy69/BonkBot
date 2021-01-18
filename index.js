// Imports
const Discord = require('discord.js');
const conf = require('./config.js');
const bot = new Discord.Client();
const talkedRecently = new Set();

// Vars
const token = conf.discordAPI;
var prefix = conf.prefix;

// Main
bot.on('message', message => {
  if (message.author.bot) return;
  let messageArray = message.content.split(' ');
  let args = messageArray.slice(1);
  let cmd = messageArray[0];
  let member = message.mentions.members.first();
  let guild = message.guild;

// ~~~ Initalize the Bot ~~~
  if (cmd === `${prefix}install`){
  	// Create a Role for Bonk Mod. 
  	guild.roles.create({
  		data: {
    			name: 'Bonk Mod',
    			color: 'BLUE',
  			  },
	})
  		.then(console.log)
  		.catch(console.error);

  	message.channel.send("Bonk Mod Role Created, members with this role can use bonkbot commands.");
  	// Create a Role for Bonk Jail.
  	  	guild.roles.create({
  		data: {
    			name: 'Bonk Jail',
    			color: 'GREEN',
  			  },
	})
  		.then(console.log)
  		.catch(console.error);
  	message.channel.send("Bonk Jail Role Created.");
  
  // Create a Channel for Bonk Jail
  	guild.channels.create('Bonk Jail')
  	.then(console.log)
  	.catch(console.error);
  message.channel.send("Bonk Jail Channel Created");
  }

// ~~~ Mod only function ~~~
  if (cmd === `${prefix}bonkhide` && message.member.roles.cache.some(r => r.name === "Bonk Mod")){
  message.channel.send("Channel Permissions Changed");
    // Hides a single channel from Bonk Jail role. 
    let bonkjailrole = message.guild.roles.cache.find(r => r.name === "Bonk Jail");
    let channel = message.channel;
    channel.updateOverwrite(bonkjailrole, {VIEW_CHANNEL: false});
  }

// ~~~ Main Commands ~~~
  if (cmd == `${prefix}bonk` && message.member.roles.cache.some(r => r.name === "Bonk Mod")){

    // Give the member the Bonk Jail role
    var role= member.guild.roles.cache.find(role => role.name === "Bonk Jail");
    member.roles.add(role);
  }

  if (cmd == `${prefix}endbonk` && message.member.roles.cache.some(r => r.name === "Bonk Mod")){

    // Give the member the Bonk Jail role
    var role= member.guild.roles.cache.find(role => role.name === "Bonk Jail");
    member.roles.remove(role);
  }

  if (cmd == `${prefix}help`){
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#B4D455')
      .setTitle('✨ Mousy makes coffee into code ~ show some love ✨')
      .setURL('https://linktr.ee/mousy69')
      .addFields(
        { name: '!bonk @member', value: 'Sends a member to Bonk Jail.' },
        { name: '!endbonk @member', value: 'Removes a member to Bonk Jail.' },
        { name: '!install', value: 'Initial installation of Bonk Jail.' },
        { name: '!bonkhide', value: 'Hides a channel from users with Bonk Jail Role.' },
      )
      .setTimestamp()

    message.channel.send(exampleEmbed);
  }

});
bot.login(token);