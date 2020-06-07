import { MessageHandler } from "./MessageHandler";
import { Dice } from "dice-typescript";
import { UserConfigurationService } from "../service/UserConfigurationService";
import { Message } from "../Message";
import { UserConfiguration } from "src/entity/UserConfiguration";


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
    const msgArgs = msg.content.toString();
    const userConfigs = await this.userConfigurationService.getUserConfigs(msg.user.id);
    
    const populatedMessage = this.populateMessageWithUserConfigs(msgArgs, userConfigs);

    try {
      const diceRoll = this.dice.roll(populatedMessage);
      const total = diceRoll.total;
      const renderedExpr = diceRoll.renderedExpression;

      const response = renderedExpr + " -------> " + total

      msg.reply(response);
    } catch (err) {
      msg.reply("Could not parse " + msgArgs)
    }
  }

  populateMessageWithUserConfigs(msgArgs: string, userConfigs: UserConfiguration[]): string {
    let prevMessage = msgArgs;
    let returnMessage = prevMessage;
    do {
      prevMessage = returnMessage;
      userConfigs.forEach(config => {
        returnMessage = returnMessage.replace(config.key, config.replacement).trim();
      });
    } while (prevMessage !== returnMessage);

    return returnMessage;
  }

}