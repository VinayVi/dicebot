import { EntityRepository, Repository } from "typeorm";
import { UserConfiguration } from "./UserConfiguration";

@EntityRepository(UserConfiguration)
export class UserConfigurationRepository extends Repository<UserConfiguration> {

  findAllByUserId(userId: string) {
    return this.find({ userId: userId })
  }

  saveAndReplace(userConfiguration: UserConfiguration) {
    return this.createQueryBuilder()
      .insert()
      .into(UserConfiguration)
      .values(userConfiguration)
      .onConflict(`ON CONSTRAINT userconfiguration_userid_key DO UPDATE SET replacement = excluded.replacement`)
      .execute();
  }

}