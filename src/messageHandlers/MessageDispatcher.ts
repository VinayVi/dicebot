import { MessageHandler, DiscriminatingMessageHandler } from "./MessageHandler";
import { Message } from "../Message";
import * as config from "../config.json";
import Discord from "discord.js";

export class MessageDispatcher {
  constructor(private readonly handlers: DiscriminatingMessageHandler[], private readonly defaultHandler: MessageHandler) { }

  dispatchMessage(msg: Discord.Message) {
    const message = Message.from(msg);

    const viableHandlers = this.handlers.filter(handler => handler.supports(message));
    const selectedHandler = viableHandlers.length != 1 ? this.defaultHandler : viableHandlers[0];
    
    return selectedHandler.handle(message);
  }
}