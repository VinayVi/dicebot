import { AbstractDiscriminatingMessageHandler } from "./MessageHandler";
import { Message } from "../Message";
import { Snowflake } from "discord.js";

export class HelpHandler extends AbstractDiscriminatingMessageHandler {

  constructor() {
    super()
  }

  getLongPrefix(): string {
    return "--help";
  }

  getShortPrefix(): string {
    return "-h";
  }

  async handle(msg: Message): Promise<void> {
    let response = `
    Welcome to the dicebot. This bot is a simple dice-parsing discord bot that allows users to save specific configurations. This makes repeated throws much easier. For example, I can save a configuration that maps
    attack => 1d20 + 7. Whenever I want to roll my attack, I simply have to send in "attack" instead of "1d20 + 7". These configurations are both composable and user-specific.

      --get-config, -g: Returns all the configurations tied to your user account.
      --save-config, -s [key] [replacement]: Saves a configuration that maps [key] to [replacement].
      --delete-config, -d [key]: Deletes a configuration with the given [key]. Returns success even if no configuration is found.
      --help, h: Prints this message :)

    All other messages are parsed as if they are a dice roll.
    `;

    msg.reply(response);
  }
}