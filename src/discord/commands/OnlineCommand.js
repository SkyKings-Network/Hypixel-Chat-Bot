const DiscordCommand = require('../../contracts/DiscordCommand')

class OnlineCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'online'
    this.aliases = ['onlinies']
    this.description = 'Shows the online guild members'
  }

  onCommand(message) {
    this.sendMinecraftMessage(`/g online`)
  }
}

module.exports = OnlineCommand
