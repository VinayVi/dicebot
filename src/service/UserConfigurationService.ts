import { Snowflake } from "discord.js";
import { UserConfigurationRepository } from "src/entity/UserConfigurationRepository";
import { UserConfiguration } from "src/entity/UserConfiguration";
import { InsertResult } from "typeorm";

/**
 * A service that abstracts over the @see UserConfigurationRepository. This handles the promise
 * that entity exports and uses the repository synchronously.
 */
export class UserConfigurationService {
  private userConfigurationRepository: UserConfigurationRepository;

  constructor(promise: Promise<UserConfigurationRepository>) {
    promise.then(u => this.userConfigurationRepository = u);
  }

  async setUserConfig(userId: Snowflake, key: string, replacement: string): Promise<InsertResult> {
    const userConfiguration = this.userConfigurationRepository.create();
    userConfiguration.key = key;
    userConfiguration.userId = userId;
    userConfiguration.replacement = replacement;
    return this.userConfigurationRepository.saveAndReplace(userConfiguration);
  }

  async getUserConfigs(userId: Snowflake): Promise<UserConfiguration[]> {
    return this.userConfigurationRepository.findAllByUserId(userId);
  }

  async clearAllConfigs(): Promise<void> {
    return this.userConfigurationRepository.clear();
  }
}