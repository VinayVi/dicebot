import { Message } from "../Message";

export interface MessageHandler {
  handle(msg: Message): void;
}

/**
 * A MessageHandler that has the ability to tell the dispatcher that it
 * doesn't support a given message
 */
export interface DiscriminatingMessageHandler extends MessageHandler {
  supports(msg: Message): boolean;
}