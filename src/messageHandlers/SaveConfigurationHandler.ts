import { DiscriminatingMessageHandler } from "./MessageHandler";
import { UserConfig } from "../userConfiguration/Configuration";
import { Message } from "../Message";
import { Snowflake } from "discord.js";

export class SaveConfigurationHandler implements DiscriminatingMessageHandler {
  private static readonly PREFIX: string = "--save-config";

  supports(msg: Message): boolean {
    return msg.content.startsWith(SaveConfigurationHandler.PREFIX);
  }
  handle(msg: Message): void {
    const userId: Snowflake = msg.user.id;

    const args = msg.content.substr(SaveConfigurationHandler.PREFIX.length).trim();
    const space = args.indexOf(" ");
    const key = args.slice(0, space).trim();
    const replacement = args.slice(space).trim();

    UserConfig.setUserConfig(userId, key, replacement);

    msg.rawMessage.reply("Configuration Saved!")
  }

}