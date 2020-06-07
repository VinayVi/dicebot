import { DiscriminatingMessageHandler } from "./MessageHandler";
import { UserConfigurationService } from "../service/UserConfigurationService";
import { Message } from "../Message";
import { Snowflake } from "discord.js";

export class GetConfigurationHandler implements DiscriminatingMessageHandler {
  private static readonly PREFIX: string = "--get-config";

  constructor(private readonly userConfigurationService: UserConfigurationService) {}

  supports(msg: Message): boolean {
    return msg.content.startsWith(GetConfigurationHandler.PREFIX);
  }

  async handle(msg: Message): Promise<void> {
    const userId: Snowflake = msg.user.id;
    const userConfigs = await this.userConfigurationService.getUserConfigs(userId);

    const response = JSON.stringify(userConfigs);

    msg.rawMessage.reply(response);
  }

}