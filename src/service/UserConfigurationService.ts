import { Snowflake } from "discord.js";
import { UserConfigurationRepository } from "src/entity/UserConfigurationRepository";
import { UserConfiguration } from "src/entity/UserConfiguration";

export class UserConfigurationService {
  private userConfigurationRepository: UserConfigurationRepository;

  constructor(promise: Promise<UserConfigurationRepository>) {
    promise.then(u => this.userConfigurationRepository = u);
  }

  async setUserConfig(userId: Snowflake, key: string, replacement: string): Promise<UserConfiguration> {
    const userConfiguration = this.userConfigurationRepository.create();
    userConfiguration.key = key;
    userConfiguration.userId = userId;
    userConfiguration.replacement = replacement;
    return this.userConfigurationRepository.save(userConfiguration);
  }

  async getUserConfig(userId: Snowflake): Promise<Map<string, string>> {
    return new Promise((resolve, reject) => {
      this.userConfigurationRepository.findAllByUserId(userId)
        .then(userConfigurations => {
          const map = new Map<string,string>();
          userConfigurations.forEach(element => {
            map.set(element.key, element.replacement);
          });
          resolve(map);
        })
        .catch(reject)
    });
  }

  async clearAllConfigs(): Promise<void> {
    return this.userConfigurationRepository.clear();
  }
}