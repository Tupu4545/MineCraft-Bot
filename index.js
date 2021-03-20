const mineflayer = require('mineflayer')
const D = require('discord.js')
const tpsPlugin = require('mineflayer-tps')(mineflayer)
const client = new D.Client();
const config = require('./config.json')
const chalk = require('chalk')

let prefix = config.prefix;
let color = "#RANDOM";

client.on('ready', activity => {
  client.user.setStatus(`online`)
  client.user.setActivity(
    `Minecraft`, {
      type: "PLAYING"
    }
  )
});

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

let bot
let isbotexist = false
function turnonbot(ip, version, username, pass,client,msg) {
if(isbotexist == true) return msg.channel.send(`There is already a bot running...\nUse ${prefix}leave first to get the bot off`)
  bot = mineflayer.createBot({
    host: ip,
    username: username,
    password: pass,
    version: version
  })
  bot.loadPlugin(tpsPlugin)
  bot.on('error', error =>{
	let channel = client.channels.cache.get(config.channel)
    if (!channel) return;
    channel.send(`${error}`)
  })
  bot.on('kicked', kicked =>{
	let channel = client.channels.cache.get(config.channel)
    if (!channel) return;
    channel.send(`${kicked}`)
  })
 
  bot.on('login', async () => {
    console.log(chalk.magenta(`${bot.username} is on At ${ip}`))

    let channel = client.channels.cache.get(config.channel)
    channel.send(`${bot.username} Has Logged into ${ip}`)
  })

  bot.on("message", message => {
    let channel = client.channels.cache.get(config.channel)
    if (!channel) return;
    channel.send(`${message}`)
  })
  isbotexist = true
}
function leave(msg){
  isbotexist = false
  bot.end()
  bot.on("end", function(){
    msg.channel.send("The Bot Has Sucsessfully ended")
  })
}
client.on('message', msg => {
  if (!msg.content.startsWith(prefix)) return
  let args = msg.content.split(" ").slice(1)
  args = msg.content.slice(prefix.length).split(/ +/);
  let command = msg.content.split(" ")[0];
  command = command.slice(prefix.length);
  command = args.shift().toLowerCase();
  if(command == "say") {
    const chat = args.join(" ")
    bot.chat(chat)
  }
  if(command == "tps") {
	let channel = client.channels.cache.get(config.channel)
	if (!channel) return;
	channel.send('***Current tps: ***' + bot.getTps())
  }
  if(command == "join") {
    // Command = {Prefix}join ip version username password
    // Command = {Prefix}join args0 args1 args2 args3
    turnonbot(args[0], args[1], args[2], args[3],client,msg)
  }else if (command == "leave"){
    leave(msg)
  }
})


client.login(config.token_discord)
  .catch(error => {
    console.log(`cant login`);
  })