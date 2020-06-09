import { AbstractDiscriminatingMessageHandler } from "./MessageHandler";
import { UserConfigurationService } from "../service/UserConfigurationService";
import { Message } from "../Message";
import { Snowflake } from "discord.js";

export class DeleteConfigurationHandler extends AbstractDiscriminatingMessageHandler {

  constructor(private readonly userConfigurationService: UserConfigurationService) {
    super();
  }

  getLongPrefix(): string {
    return "--delete-config";
  }

  getShortPrefix(): string {
    return "-d";
  }

  async handle(msg: Message): Promise<void> {
    const userId: Snowflake = msg.user.id;

    const args = this.getArgs(msg.content);
    const key = args.trim();

    this.userConfigurationService.deleteUserConfig(userId, key)
      .then(_ => msg.reply("Configuration Deleted!"));
  }
}