import { DiscriminatingMessageHandler } from "./MessageHandler";
import { ConfigRepository } from "../userConfiguration/Configuration";
import { Message } from "../Message";
import { Snowflake } from "discord.js";

export class GetConfigurationHandler implements DiscriminatingMessageHandler {
  private static readonly PREFIX: string = "--get-config";

  constructor(private readonly configRepository: ConfigRepository) {}

  supports(msg: Message): boolean {
    return msg.content.startsWith(GetConfigurationHandler.PREFIX);
  }

  async handle(msg: Message): Promise<void> {
    const userId: Snowflake = msg.user.id;
    const userConfig = await this.configRepository.getUserConfig(userId);

    const response = JSON.stringify(Array.from(userConfig.entries()));

    msg.rawMessage.reply(response);
  }

}