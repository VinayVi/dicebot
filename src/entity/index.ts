import { createConnection, EntityRepository, Repository } from "typeorm";
import { UserConfiguration } from "./UserConfiguration";
import { UserConfigurationRepository } from "./UserConfigurationRepository";

const connection = createConnection({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "alpine",
  database: "dicebot",
  entities: [
      UserConfiguration
  ],
  synchronize: true,
  logging: false
});

const userConfigurationRepository: Promise<UserConfigurationRepository> = new Promise((resolve, reject) => {
  connection
    .then(c => resolve(c.getCustomRepository(UserConfigurationRepository)))
    .catch(reject)
})

export { userConfigurationRepository }