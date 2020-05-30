import { Snowflake } from "discord.js";

export class UserConfig {
  // username => key => replacement
  private static userConfigurationMap = new Map<Snowflake, Map<string, string>>();

  public static setUserConfig(userId: Snowflake, key: string, replacement: string): void {
    const map = this.getUserConfig(userId);
    map.set(key, replacement);
  }

  public static getUserConfig(userId: Snowflake): Map<string, string> {
    if (!UserConfig.userConfigurationMap.has(userId)) {
      const map = new Map<string,string>();
      UserConfig.userConfigurationMap.set(userId, map);
      return map;
    }
    return UserConfig.userConfigurationMap.get(userId)!;
  }
}