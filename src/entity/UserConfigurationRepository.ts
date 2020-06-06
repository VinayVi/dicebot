import { EntityRepository, Repository } from "typeorm";
import { UserConfiguration } from "./UserConfiguration";

@EntityRepository(UserConfiguration)
export class UserConfigurationRepository extends Repository<UserConfiguration> {

  findAllByUserId(userId: string) {
    return this.find({ userId: userId })
  }

}