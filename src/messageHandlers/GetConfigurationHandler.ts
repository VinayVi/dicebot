import { DiscriminatingMessageHandler } from "./MessageHandler";
import { UserConfig } from "../userConfiguration/Configuration";
import { Message } from "../Message";
import { Snowflake } from "discord.js";

export class GetConfigurationHandler implements DiscriminatingMessageHandler {
  private static readonly PREFIX: string = "--get-config";

  supports(msg: Message): boolean {
    return msg.content.startsWith(GetConfigurationHandler.PREFIX);
  }
  handle(msg: Message): void {
    const userId: Snowflake = msg.user.id;
    const userConfig = UserConfig.getUserConfig(userId);

    const response = JSON.stringify(Array.from(userConfig.entries()));

    msg.rawMessage.reply(response);
  }

}