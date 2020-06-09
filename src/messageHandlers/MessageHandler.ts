import { Message } from "../Message";

export interface MessageHandler {
  handle(msg: Message): Promise<void>;
}

/**
 * A MessageHandler that has the ability to tell the dispatcher that it
 * doesn't support a given message
 */
export interface DiscriminatingMessageHandler extends MessageHandler {
  supports(msg: Message): boolean;
}

export abstract class AbstractDiscriminatingMessageHandler implements DiscriminatingMessageHandler {
  abstract handle(msg: Message): Promise<void>;

  abstract getLongPrefix(): string;
  abstract getShortPrefix(): string;

  supports(msg: Message): boolean {
    return msg.content.startsWith(this.getLongPrefix()) || msg.content.startsWith(this.getShortPrefix());
  }

  protected getArgs(content: string): string {
    const prefix = content.startsWith(this.getLongPrefix()) ? this.getLongPrefix() : this.getShortPrefix();
    return content.substr(prefix.length).trim();
  }
}