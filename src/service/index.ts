import { UserConfigurationService } from "./UserConfigurationService";
import { userConfigurationRepository } from "../entity";

const userConfigurationService = new UserConfigurationService(userConfigurationRepository);

export { userConfigurationService }