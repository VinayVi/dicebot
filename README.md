## Local Development

### Configuration
Running this server requires a single file which isn't checked into source control: `src/discord.config.json`

`src/discord.config.json`
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
Once the `src/discord.config.json` file is set up, the bot can be started by running `docker-compose up`
