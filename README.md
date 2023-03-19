[Discord Support](discord.gg/skykings) | [Youtube Video](https://www.youtube.com/watch?v=HJZCP0aqwOQ)

# Hypixel Discord Chat Bridge

A two-way chat bridge between [Hypixel](https://hypixel.net/) guild chat and a [Discord](https://discord.com/) channel. The application utilizes [Discord.js-light](https://github.com/timotejroiko/discord.js-light) for communicating with Discord, and [Mineflayer](https://github.com/PrismarineJS/mineflayer) for communicating with Hypixel.

> This application will login to Hypixel using Mineflayer which is not a normal Minecraft client, this could result in your Minecraft account getting banned from Hypixel, so use this application at your own risk.

<hr>

## Table of Content

- [How To Setup](#installation-using-nodejs)
- [Configuration](#configuration)
- [Roadmap](#roadmap)

## Installation using NodeJS

### Prerequisites

- Hosting
- A Minecraft account

### Setup Guide
This setup guide is for any hosting server using Ubuntu. Check the above video to see how to set one up.

This setup will allow you to run multiple bridge bots on the same server.

Once you have a fresh Ubuntu server, run these commands in order.

If you have a new Ubuntu server, you will only need to use these steps once. Once you have done these starting commands, you can move onto the next steps.


## Setting Up New Server (Commands)
These set of commands below **should only be used once per new server**, after you have done these the first time, you will never have to use them again on that server. Now you can paste these line by line into your Ubuntu server.

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

source ~/.bashrc

nvm install 19.7.0

npm install -g pm2

apt install git

git clone https://github.com/Jacktheguys/Hypixel-Chat-Bot

mkdir bridges

mkdir bridges/bridgebots

cd Hypixel-Chat-Bot/

mv config.example.json config.json

npm install -g yarn

yarn
```

## Creating A New Bridge Bot
Once you have setup your server with the section above, you can use these commands below to set up multiple bridge bots on the same server. If you are setting up multiple, make sure to use all the commands in order after every new one. Now you can paste these line by line into your Ubuntu server.

Note: **Make sure to remove any <> where stated, as they are just placeholders to tell you what to change.**

```sh
cd ~

mkdir bridges/bridgebots/<NAME_OF_GUILD>-Bridgebot

cp -r Hypixel-Chat-Bot/ bridges/bridgebots/<NAME_OF_GUILD>-Bridgebot/

cd bridges/bridgebots/<NAME_OF_GUILD>-Bridgebot/Hypixel-Chat-Bot/

nano config.json (edit this with correct info)

pm2 start index.js --name NAMEOFBRIDGE-BridgeBot
```

## How To Update A Bridge Bot
If we make a update to the code, you will have to update the code manually for each bridge bot, to do this you can use the commands below **for each individual bridge bot**.

```sh
cd bridges/bridgebots/<NAME_OF_GUILD>-Bridgebot/Hypixel-Chat-Bot/

git pull

pm2 restart NAMEOFBRIDGE-BridgeBot
```

### Commands

`< >` = Required arguments, `[ ]` Optional arguments

- `!help` - Displays the list of commands (`!h`)
- `!relog` - Relogs the MC client, a delay can be given in seconds, if no delay is given it will default to 5 seconds (`!r`)
- `!override <command> [args]` - Executes the string attached. This is a dangerous permission to grant (`!o`, `!or`)
- `!invite <player>` - Invites the specified user to the guild, providing the guild isn't full (`!i`, `!inv`)
- `!kick <user> [reason]` - Kicks the specified user from the guild (`!k`)
- `!promote <user>` - Promotes the specified user by 1 rank (`!p`, `!up`)
- `!demote <user>` - Demotes the specified user by 1 rank (`!d`, `!down`)
- `!online` - Shows the online users

### Roadmap

- [ ] Chat message filter
  - The filter should block any messages sent from Discord to Hypixel that contains banable words, and words that could potentially cause a mute.
- [ ] Log guild events
  - Guild joins/leaves/kicks, mutes/unmutes and promotion/demotions
- [ ] Ingame commands
  - Add commands for players to use ingame to check other player stats (eg `!skills <ign>`, `!weight <ign>` etc)
- [ ] Add support for officer chat
  - Allocate a second discord channel to use for two way officer chat.
- [ ] Make it easier to setup

### Change Log
#### March 19th:
   - Added Blacklisted words
   - Fixed limbo message
   - Added tutorial to update bridge bot

## License

Hypixel Discord Chat Bridge is open-sourced software licensed under the [MIT License](https://opensource.org/licenses/MIT).
