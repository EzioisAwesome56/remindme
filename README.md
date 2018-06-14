# RemindMeBot 
Remindme bot version 1.6.1, with minor changed due to the bot being dead now
## Getting started

Make sure you have `git` and `node` (Version 7.6.0 tested and working) installed on your machine.<br>
_Side note - if your version of Node is below 7.6, you need to run with a `--harmony` flag._

Clone the repo, go into it, npm install:
```
git clone https://github.com/EzioisAwesome56/remindme.git folderName
cd folderName
npm install
```

Fill in your config file (`src/config.json`) with all of the keys and settings:
```js
{
  "defaultPrefix": "", // Default prefix for the bot
  "embedColor": 16777215, // The embed color for all of the embeds that the bot returns, in base10
  "ownerID": "", // ID of the owner of the bot. Gives you access to eval / bash commands
  "tick": 3000, // The tick of the interval at which the bot checks for reminders that are due. Don't put this too low or it'll start sending double reminders
  "keys": {
    "token": "", // Your bot token
    "dbl": "", // discord.bots.org token, leave empty if you don't have one
    "botspw": "", // bots.discord.pw token, leave empty if you don't have one
    "novo": "" // novo token, leave empty if you don't have one
  },
  "disabledEvents": [ // Disabled websocket events. Removing items from this list is probably harmless, but adding some can fuck up things. Be careful.
    "CHANNEL_PINS_UPDATE",
    "USER_NOTE_UPDATE",
    "VOICE_STATE_UPDATE",
    "TYPING_START",
    "VOICE_SERVER_UPDATE",
    "RELATIONSHIP_ADD",
    "RELATIONSHIP_REMOVE",
    "GUILD_BAN_ADD",
    "GUILD_BAN_REMOVE", 
    "MESSAGE_UPDATE",
    "MESSAGE_DELETE_BULK",
    "MESSAGE_REACTION_ADD",
    "MESSAGE_REACTION_REMOVE",
    "MESSAGE_REACTION_REMOVE_ALL"
  ]
}

```

At this point, all you have to do is start the bot with `sudo npm start` (or `sudo pm2 start remindmebot.js`).

## License
This project is licensed under the MIT License - see the [LICENSE file](https://github.com/EzioisAwesome56/remindme/blob/master/LICENSE) for more info. Basically, you can do whatever the fuck you like as long as you mention/credit me. Oh, and you can't sue me if it blows up.