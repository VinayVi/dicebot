## Local Development

### Configuration
Local development requires two files which are not checked into source control: .env and src/discord.config.json.

.env
---
```
DATADIRECTORY=string
```
`DATADIRECTORY`: The directory on the host machine where the data should be saved

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

## Starting the Server
Once the configurations are set up, the bot can be started by running `docker-compose up`
