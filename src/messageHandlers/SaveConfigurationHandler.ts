import { DiscriminatingMessageHandler } from "./MessageHandler";
import { UserConfigurationService } from "../service/UserConfigurationService";
import { Message } from "../Message";
import { Snowflake } from "discord.js";

export class SaveConfigurationHandler implements DiscriminatingMessageHandler {
  private static readonly PREFIX: string = "--save-config";

  constructor(private readonly userConfigurationService: UserConfigurationService) {}

  supports(msg: Message): boolean {
    return msg.content.startsWith(SaveConfigurationHandler.PREFIX);
  }

  async handle(msg: Message): Promise<void> {
    const userId: Snowflake = msg.user.id;

    const args = msg.content.substr(SaveConfigurationHandler.PREFIX.length).trim();
    const space = args.indexOf(" ");
    const key = args.slice(0, space).trim();
    const replacement = args.slice(space).trim();

    await this.userConfigurationService.setUserConfig(userId, key, replacement);

    msg.rawMessage.reply("Configuration Saved!")
  }

}