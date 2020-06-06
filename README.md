## Local Development

### Configuration
Local development requires two files which are not checked into source control: db.config.json and src/discord.config.json.

db.config.json 
---
```
{
  "dataDir": string,
  "host": string,
  "port": integer,
  "username": string,
  "password": string,
  "database": string
}
```
`dataDir`: The directory on the host machine where the data should be saved
`host`: The database host. `localhost` is probably answer here
`port`: The database port. The default for postgres is 5432
`username`: The database username. The default for postgres is `postgres` 
`password`: The password of the database.
`database`: The name of the database

src/discord.config.json 
---
```
{
  "token": string,
  "prefix": string
}
```
`token`: This is the discord bot token
`prefix`: The prefix for the bot. It will only respond to messages starting with this prefix.

## Starting the Database
Once the configurations are set up, the database can be started by running `./scripts/startdb.sh`

## Starting the Server
The server can be started with the following series of steps
1. `npm install`
2. `node start`

`node start` will compile the typescript to javascript and then start the node server against the compiled files.