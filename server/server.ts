import Discord from 'discord.js';
import { Dice } from 'dice-typescript';
import * as config from './config.json';
import { SaveConfigurationHandler } from './messageHandlers/SaveConfigurationHandler';
import { GetConfigurationHandler } from './messageHandlers/GetConfigurationHandler';
import { DefaultHandler as DefaultHandler } from './messageHandlers/DefaultHandler';
import { MessageDispatcher } from './messageHandlers/MessageDispatcher';

const dice = new Dice();


const saveConfigurationHandler: SaveConfigurationHandler = new SaveConfigurationHandler();
const getConfigurationhandler: GetConfigurationHandler = new GetConfigurationHandler();
const defaultHandler: DefaultHandler = new DefaultHandler();

const dispatcher: MessageDispatcher = new MessageDispatcher([saveConfigurationHandler, getConfigurationhandler], defaultHandler);

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith(config.prefix)) {
    dispatcher.dispatchMessage(msg);

    
    // const msgArgs = msg.content.substr(config.prefix.length);
    // try {
    //   const diceRoll = dice.roll(msgArgs);
    //   const total = diceRoll.total;
    //   const renderedExpr = diceRoll.renderedExpression;
    //   const reducedExpr = diceRoll.reducedExpression;
    //   msg.reply(total);
    //   msg.reply(renderedExpr);
    //   msg.reply(reducedExpr);
    // } catch (err) {
    //   msg.reply("Could not parse " + msgArgs)
    // }
  }
});

client.login(config.token).catch(err => console.log(err));
