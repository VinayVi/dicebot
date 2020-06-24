import { AbstractDiscriminatingMessageHandler } from "./MessageHandler";
import { UserConfigurationService } from "../service/UserConfigurationService";
import { Message } from "../Message";
import { Snowflake } from "discord.js";

export class ExportConfigurationHandler extends AbstractDiscriminatingMessageHandler {

  constructor(private readonly userConfigurationService: UserConfigurationService) {
    super();
  }

  getLongPrefix(): string {
    return "--export-config";
  }

  getShortPrefix(): string {
    return "-e";
  }

  async handle(msg: Message): Promise<void> {
    const userId: Snowflake = msg.user.id;
    const userConfigs = await this.userConfigurationService.getUserConfigs(userId);

    let response:any = {};

    userConfigs.forEach(u => {
      response[u.key] = u.replacement;
    })

    msg.reply(JSON.stringify(response));
  }
}