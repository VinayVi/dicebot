import { AbstractDiscriminatingMessageHandler } from "./MessageHandler";
import { UserConfigurationService } from "../service/UserConfigurationService";
import { Message } from "../Message";
import { Snowflake } from "discord.js";

export class SaveConfigurationHandler extends AbstractDiscriminatingMessageHandler {

  constructor(private readonly userConfigurationService: UserConfigurationService) {
    super();
  }

  getLongPrefix(): string {
    return "--save-config";
  }

  getShortPrefix(): string {
    return "-s";
  }

  async handle(msg: Message): Promise<void> {
    const userId: Snowflake = msg.user.id;

    const args = this.getArgs(msg.content);
    const space = args.indexOf(" ");
    const key = args.slice(0, space).trim();
    const replacement = args.slice(space).trim();

    await this.userConfigurationService.setUserConfig(userId, key, replacement);

    msg.reply("Configuration Saved!")
  }
}