import { MessageHandler } from "./MessageHandler";
import { Dice } from "dice-typescript";
import { UserConfigurationService } from "../service/UserConfigurationService";
import { Message } from "../Message";


export class DiceRollParsingHandler implements MessageHandler {
  private readonly dice: Dice;

  constructor(private readonly userConfigurationService: UserConfigurationService) {
    this.dice = new Dice();
  }

  supports(msg: Message): boolean {
    // This is the fallback handler, so this supports everything
    return true;
  }
  
  async handle(msg: Message): Promise<void> {
    let msgArgs = msg.content.toString();
    const userConfigs = await this.userConfigurationService.getUserConfigs(msg.user.id);
    
    userConfigs.forEach(config => {
      msgArgs = msgArgs.replace(config.key, config.replacement);
    });

    try {
      const diceRoll = this.dice.roll(msgArgs);
      const total = diceRoll.total;
      const renderedExpr = diceRoll.renderedExpression;

      const response = renderedExpr + " -------> " + total

      msg.reply(response);
    } catch (err) {
      msg.reply("Could not parse " + msgArgs)
    }
  }

}