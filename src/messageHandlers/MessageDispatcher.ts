import { MessageHandler } from "./MessageHandler";
import { Message } from "../Message";
import * as config from "../config.json";
import Discord from "discord.js";

export class MessageDispatcher {
  private readonly handlers: MessageHandler[];

  /**
   * If the message is unsupported by the above handlers, or too many handlers support a message,
   * then fallback to the default handler
   */
  private defaultHandler: MessageHandler;

  constructor(handlers: MessageHandler[], defaultHandler: MessageHandler) {
    this.handlers = handlers;
    this.defaultHandler = defaultHandler;
  }

  dispatchMessage(msg: Discord.Message) {
    const message = Message.from(msg);

    const viableHandlers = this.handlers.filter(handler => handler.supports(message));
    const selectedHandler = viableHandlers.length != 1 ? this.defaultHandler : viableHandlers[0];
    
    return selectedHandler.handle(message);
  }
}