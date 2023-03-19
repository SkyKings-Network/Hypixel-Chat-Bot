const fs = require('fs')

class Configuration {
  properties = {
    server: {
      host: 'localhost',
      port: 25565,
    },
    minecraft: {
      username: null,
      password: null,
      lobbyHolder: null,
      accountType: 'mojang',
    },
    discord: {
      token: null,
      channel: null,
      commandRole: '',
      ownerId: '',
      prefix: '!',
      messageMode: 'bot',
      autoAccept: false,
      weightRequirements: 0,
      blacklistedWords: ["nigger", "negro", "cunt", "faggot", "bitch", "fuck", "gay", "fag", "shit", "slag", "slut", "hitler", "nazi", 'dick', 'ch1t', 
                          'd1ck', 'dik', 'dic', 'd1c', 'azz', 'c0ck', 'cock', 'penis', 'vagina', 'vegina', 'vejina', 'vajina', 'muzerfucer', 'motherfucker', 
                          'kock', 'koc', 'k0ck', 'f0k', 'fock', 'fok', 'foc', 'kys', 'fuck', 'cunt', 'cvnt', 'dickhead', 'asshole', 'arsehole', 'fuckhead', 
                          'fag', 'fags', 'faggot', 'faggots', 'feggit', 'feggits', 'faggit', 'faggits', 'cunts', 'kkk', 'whore', 'whores', 'slut', 'sluts', 
                          'cunt', 'cunts', 'dickhead', 'dickheads', 'fucktard', 'fucker', 'fvcker', 'fuckerrs', 'fvckers', 'fckkers', 'fucking', 'fvcking', 
                          'shit', 'shart', 'shite', 'whalecum', 'pussy', 'cock', 'dick', 'twat', 'hump', 'whitey', 'redneck', 'rednecks', 'chingchong', 'darky', 
                          'darkey', 'darkie', 'darkies', 'darkys', 'darkeys', 'redskin', 'redskins', 'squinty', 'tacohead', 'anal', 'bastard', 'blowjob', 'boner', 
                          'boob', 'boobs', 'boobies', 'boobeez', 'boobiez', 'boobz', 'tit', 'tits', 'titties', 'dildo', 'vagina', 'whore', 'cum', 'heil', 'sex', 
                          'piss', 'bitch', 'fap', 'rape', 'raped', 'kekma']
    },
    express: {
      enabled: false,
      port: 8880,
      authorization: "authorizationHeaderString"
    }
  }
  

  environmentOverrides = {
    SERVER_HOST: val => (this.properties.server.host = val),
    SERVER_PORT: val => (this.properties.server.port = val),
    MINECRAFT_USERNAME: val => (this.properties.minecraft.username = val),
    MINECRAFT_PASSWORD: val => (this.properties.minecraft.password = val),
    MINECRAFT_LOBBY_HOLDER: val => (this.properties.minecraft.lobbyHolder = val),
    MINECRAFT_ACCOUNT_TYPE: val => (this.properties.minecraft.accountType = val),
    DISCORD_TOKEN: val => (this.properties.discord.token = val),
    DISCORD_CHANNEL: val => (this.properties.discord.channel = val),
    DISCORD_COMMAND_ROLE: val => (this.properties.discord.commandRole = val),
    DISCORD_OWNER_ID: val => (this.properties.discord.ownerId = val),
    DISCORD_PREFIX: val => (this.properties.discord.prefix = val),
    MESSAGE_MODE: val => (this.properties.discord.messageMode = val),
    AUTO_ACCEPT: val => (this.properties.discord.autoAccept = val),
    WEIGHT_REQUIREMENTS: val => (this.properties.discord.weightRequirements = val),
    EXPRESS_ENABLED: val => (this.properties.express.enabled = val),
    EXPRESS_PORT: val => (this.properties.express.enabled = val),
    EXPRESS_AUTHORIZATION: val => (this.properties.express.authorization = val)
  }

  constructor() {
    if (fs.existsSync('config.json')) {
      this.properties = require('../config.json')
    }

    for (let environment of Object.keys(process.env)) {
      if (this.environmentOverrides.hasOwnProperty(environment)) {
        this.environmentOverrides[environment](process.env[environment])
      }
    }
  }

  get server() {
    return this.properties.server
  }

  get minecraft() {
    return this.properties.minecraft
  }

  get discord() {
    return this.properties.discord
  }

  get express() {
    return this.properties.express
  }
}

module.exports = Configuration
