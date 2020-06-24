import { AbstractDiscriminatingMessageHandler } from "./MessageHandler";
import { UserConfigurationService } from "../service/UserConfigurationService";
import { Message } from "../Message";
import { Snowflake } from "discord.js";

export class ImportConfigurationHandler extends AbstractDiscriminatingMessageHandler {

  constructor(private readonly userConfigurationService: UserConfigurationService) {
    super();
  }

  getLongPrefix(): string {
    return "--import-config";
  }

  getShortPrefix(): string {
    return "-i";
  }

  async handle(msg: Message): Promise<void> {
    const userId: Snowflake = msg.user.id;
    
    const args = this.getArgs(msg.content);
    const importedConfigs = JSON.parse(args);

    for (let key in importedConfigs) {
      this.userConfigurationService.setUserConfig(userId, key, importedConfigs[key])
        .catch(_ => msg.reply("Could not import " + key))
    }

    msg.reply("Imported configs. Check your configs to see if all imports happened successfully");
  }
}