import { createConnection, EntityRepository, Repository } from "typeorm";
import { UserConfiguration } from "./UserConfiguration";
import * as dbconfig from '../../db.config.json';
import { UserConfigurationRepository } from "./UserConfigurationRepository";

const connection = await createConnection({
  type: "postgres",
  host: dbconfig.host,
  port: dbconfig.port,
  username: dbconfig.username,
  password: dbconfig.password,
  database: dbconfig.database,
  entities: [
      UserConfiguration
  ],
  synchronize: true,
  logging: false
});

const userConfigurationRepository = connection.getCustomRepository(UserConfigurationRepository);

export { userConfigurationRepository }