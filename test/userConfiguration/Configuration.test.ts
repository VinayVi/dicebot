import { ConfigRepository } from "../../src/userConfiguration/Configuration"
import { Snowflake } from "discord.js";

const configRepository = new ConfigRepository();

afterEach(() => {
  configRepository.clearAllConfigs();
})

const userId: Snowflake = "user";

test("UserConfiguration returns empty map on first call", () => {
  const userConfig: Map<string,string> = configRepository.getUserConfig(userId);

  expect(userConfig.size).toBe(0);
})

test("UserConfiguration sets data properly", () => {
  configRepository.setUserConfig(userId, "somestring", "somereplacement");
  
  const userConfig: Map<string,string> = configRepository.getUserConfig(userId);
  expect(userConfig.size).toBe(1);
  expect(userConfig.get("somestring")).toBe("somereplacement");
})

