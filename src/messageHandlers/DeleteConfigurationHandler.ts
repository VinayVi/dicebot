import { DiscriminatingMessageHandler } from "./MessageHandler";
import { UserConfigurationService } from "../service/UserConfigurationService";
import { Message } from "../Message";
import { Snowflake } from "discord.js";

export class DeleteConfigurationHandler implements DiscriminatingMessageHandler {
  private static readonly PREFIX: string = "--delete-config";

  constructor(private readonly userConfigurationService: UserConfigurationService) {}

  supports(msg: Message): boolean {
    return msg.content.startsWith(DeleteConfigurationHandler.PREFIX);
  }

  async handle(msg: Message): Promise<void> {
    const userId: Snowflake = msg.user.id;

    const args = msg.content.substr(DeleteConfigurationHandler.PREFIX.length).trim();
    const key = args.trim();

    this.userConfigurationService.deleteUserConfig(userId, key)
      .then(_ => msg.reply("Configuration Deleted!"));
  }

}