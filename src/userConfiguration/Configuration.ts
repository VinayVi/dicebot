import { Snowflake } from "discord.js";

class StaticUserConfig {
  // username => key => replacement
  private static readonly userConfigurationMap = new Map<Snowflake, Map<string, string>>();

  public static setUserConfig(userId: Snowflake, key: string, replacement: string): void {
    const map = this.getUserConfig(userId);
    map.set(key, replacement);
  }

  public static getUserConfig(userId: Snowflake): Map<string, string> {
    if (!this.userConfigurationMap.has(userId)) {
      const map = new Map<string,string>();
      this.userConfigurationMap.set(userId, map);
      return map;
    }
    return this.userConfigurationMap.get(userId)!;
  }

  public static clearAllConfigs(): void {
    this.userConfigurationMap.clear();
  }
}

export class ConfigRepository {
  setUserConfig(userId: Snowflake, key: string, replacement: string): void {
    StaticUserConfig.setUserConfig(userId, key, replacement);
  }

  getUserConfig(userId: Snowflake): Map<string, string> {
    return StaticUserConfig.getUserConfig(userId);
  }

  clearAllConfigs(): void {
    StaticUserConfig.clearAllConfigs();
  }
}