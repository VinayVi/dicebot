import { AbstractDiscriminatingMessageHandler } from "./MessageHandler";
import { UserConfigurationService } from "../service/UserConfigurationService";
import { Message } from "../Message";
import { Snowflake } from "discord.js";

export class GetConfigurationHandler extends AbstractDiscriminatingMessageHandler {

  constructor(private readonly userConfigurationService: UserConfigurationService) {
    super()
  }

  getLongPrefix(): string {
    return "--get-config";
  }

  getShortPrefix(): string {
    return "-g";
  }

  async handle(msg: Message): Promise<void> {
    const userId: Snowflake = msg.user.id;
    const userConfigs = await this.userConfigurationService.getUserConfigs(userId);

    let response = "\n";

    userConfigs.forEach(u => {
      response += u.key + " => " + u.replacement + "\n";
    })

    msg.reply(response);
  }
}