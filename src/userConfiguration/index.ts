import { ConfigRepository } from "./Configuration";
import { userConfigurationRepository } from "../entity";

const configRepository = new ConfigRepository(userConfigurationRepository);

export { configRepository }