import { MessageHandler } from "./MessageHandler";

export class DefaultHandler implements MessageHandler {
  supports(msg: import("../Message").Message): boolean {
    throw new Error("Method not implemented.");
  }
  handle(msg: import("../Message").Message): void {
    throw new Error("Method not implemented.");
  }

}