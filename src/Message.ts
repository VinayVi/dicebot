import Discord from 'discord.js';
import * as config from './config.json';

export class Message {
  private _content: String;
  private _user: Discord.User;

  /**
   * This is the unfiltered message received directly from the DiscordJs API
   */
  private _rawMessage: Discord.Message;

  constructor(content: String, user: Discord.User, rawMsg: Discord.Message) {
    this._content = content;
    this._user = user;
    this._rawMessage = rawMsg;
  }

	public get content(): String {
		return this._content;
	}
  
  public get user(): Discord.User {
    return this._user;
  }

  public get rawMessage(): Discord.Message {
    return this._rawMessage;
  }

  public static from(msg: Discord.Message): Message {
    const trimmedMsg = msg.content.substring(config.prefix.length).trim();
    return new Message(trimmedMsg, msg.author, msg);
  }
}