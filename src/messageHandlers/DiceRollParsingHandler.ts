import { MessageHandler } from "./MessageHandler";
import { Dice } from "dice-typescript";
import { UserConfig } from "../userConfiguration/Configuration";
import { Message } from "../Message";


export class DiceRollParsingHandler implements MessageHandler {
  private readonly dice: Dice;

  constructor() {
    this.dice = new Dice();
  }

  supports(msg: Message): boolean {
    // This is the fallback handler, so this supports everything
    return true;
  }
  handle(msg: Message): void {
    let msgArgs = msg.content.toString();
    const userConfig = UserConfig.getUserConfig(msg.user.id);
    
    userConfig.forEach((v, k) => {
      msgArgs = msgArgs.replace(k, v);
    });

    try {
      const diceRoll = this.dice.roll(msgArgs);
      const total = diceRoll.total;
      const renderedExpr = diceRoll.renderedExpression;

      const response = renderedExpr + " -------> " + total

      msg.rawMessage.reply(response);
    } catch (err) {
      msg.rawMessage.reply("Could not parse " + msgArgs)
    }
  }

}