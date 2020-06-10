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
  
  async handle(msg: Message): Promise<void> {
    const msgArgs = msg.content.toString();
    const userConfigs = await this.userConfigurationService.getUserConfigs(msg.user.id);
    
    const populatedMessage = this.populateMessageWithUserConfigs(msgArgs, userConfigs);

    const rollRequests = populatedMessage.split("&");
    this.processRequests(rollRequests, msg);
  }

  populateMessageWithUserConfigs(msgArgs: string, userConfigs: UserConfiguration[]): string {
    let prevMessage = msgArgs;
    let returnMessage = prevMessage;

    const sortedConfigs = userConfigs.sort((a, b) => {
      return b.key.length - a.key.length;
    });

    let index = 0;
    do {
      prevMessage = returnMessage;
      sortedConfigs.forEach(config => {
        returnMessage = returnMessage.replace(config.key, config.replacement).trim();
      });
      index++;
    } while (prevMessage !== returnMessage && index < 10);

    return returnMessage;
  }

  processRequests(rollRequests: string[], msg: Message) {
    rollRequests.forEach(request => {
      this.processOneRequest(request, msg);
    })
  }

  processOneRequest(request: string, msg: Message) {
    try {
      const diceRoll = this.dice.roll(request);
      const total = diceRoll.total;
      const renderedExpr = diceRoll.renderedExpression;

      const response = renderedExpr + " -------> " + total

      msg.reply(response);
    } catch (err) {
      msg.reply("Could not parse " + request)
    }
  }
}
