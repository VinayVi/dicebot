import Discord from 'discord.js';
import * as config from './discord.config.json';

export class Message {

  private constructor(
    private readonly _content: string,
    private readonly _user: Discord.User,
    private readonly _reply: (content: string) => Promise<Discord.Message>) { }

	public get content(): string {
		return this._content;
	}
  
  public get user(): Discord.User {
    return this._user;
  }

  public reply(content: string): Promise<Discord.Message> {
    return this._reply(content);
  }

  public static from(msg: Discord.Message): Message {
    const trimmedMsg = msg.content.substring(config.prefix.length).trim();
    return new Message(trimmedMsg, msg.author, c => msg.reply(c));
  }
}