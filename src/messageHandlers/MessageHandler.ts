import { Message } from "../Message";

export interface MessageHandler {
  supports(msg: Message): boolean;

  handle(msg: Message): void;
}