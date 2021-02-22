const mineflayer = require('mineflayer');
const discord = require('discord.js');
const chalk = require('chalk');
const client = new discord.Client();
const config = require('./config.json');
const bot = mineflayer.createBot({
    host: config.host, 
    port: config.port,
    username: config.username
})
bot.on('login', async =>{
    //bot.chat('/login yougsh216')//if there is any freaking passwords login :/
    console.log('Iam in the server :D')
})
client.on('ready', async =>{
    console.log(chalk.redBright('l'))
    console.log(chalk.greenBright('o'))
    console.log(chalk.blueBright('g'))
    console.log(chalk.whiteBright('g'))
    console.log(chalk.blackBright('e'))
    console.log(chalk.yellowBright('d'))
    console.log(chalk.greenBright('|- - - - - - - - - |'))
    console.log(chalk.greenBright(` ${client.user.tag}`))
    console.log(chalk.greenBright('|- - - - - - - - - |'))
})
//receving msg
bot.on("message", message => {
    let channel = client.channels.cache.get(config.channel)
    if (!channel) return;
    channel.send(`${message}`)
})
//sending msg
client.on('message', msg => {
    if (!msg.content.startsWith(config.prefix)) return
    let args = msg.content.split(" ").slice(1)
    args = msg.content.slice(config.prefix.length).split(/ +/);
    let command = msg.content.split(" ")[0];
    command = command.slice(config.prefix.length);
    command = args.shift().toLowerCase();
        if (command == "say"){
            const chat = args.join(" ")
            bot.chat(chat)
        }
  })
  client.login(config.token_discord)
  .catch(error => {
      console.log("Please Recheck The Token. [Can't Login]")
  })