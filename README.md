

<p align="center"> # Hypixel Discord Chat Bridge </p>

<p align="center"> A two way chat bridge between your discord and ingame guild chat! </p>

<p align="center"> [Discord Support](discord.gg/skykings) | [Youtube Video](https://www.youtube.com/watch?v=HJZCP0aqwOQ) </p>

<hr>

## 🤖 Bot Features
### 😎 Current!
• Sends chat messages from ingame guild chat to a discord channel, and vise versa  
• Blacklisted words  
• !help - Shows a help menu with all commands  
• !online - Shows all online guild members  
• !list - Shows all guild members  
• !invite - Invites a member to the guild (staff only command)  
• !kick (username) - Kicks the specified member (staff only command)  
• !mute - Mutes the specified member (staff only command)  
• !promote (username) - Promotes the specified user up 1 rank  
• !notifications - Enables/Disables guild join/leave notifications (staff only command)  
• !relog - Relogs the bridge bot incase it logs out (staff only command)  

### 📝 Planned...
• Ingame commands ('!skill <ign>', '!weight <ign>', '!networth <ign>', etc)  
• Officer chat support  

## 💻 Setup Guide

### Prerequisites

- Hosting (w/ Ubuntu)
- A Minecraft account

This setup guide is for any hosting server using Ubuntu. Check the above video to see how to set one up. This will allow you to run multiple bridge bots on the same server. Once you have a fresh Ununtu server, you can start by running all of these commands in order. If you have a new Ubuntu server, you will only need to use these steps once. Once you have done these starting commands, you can move onto the next steps.


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


### Change Log
#### March 19th:
   - Added Blacklisted words
   - Fixed limbo message
   - Added tutorial to update bridge bot

## License

Hypixel Discord Chat Bridge is open-sourced software licensed under the [MIT License](https://opensource.org/licenses/MIT).
