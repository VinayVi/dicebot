import Discord from 'discord.js';
import * as config from './config.json';
import { SaveConfigurationHandler } from './messageHandlers/SaveConfigurationHandler';
import { GetConfigurationHandler } from './messageHandlers/GetConfigurationHandler';
import { DefaultHandler as DefaultHandler } from './messageHandlers/DefaultHandler';
import { MessageDispatcher } from './messageHandlers/MessageDispatcher';

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
  }
});


client.login(config.token).catch(err => console.log(err));
