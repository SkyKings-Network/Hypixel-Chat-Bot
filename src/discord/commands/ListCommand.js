const DiscordCommand = require('../../contracts/DiscordCommand')

class OnlineCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'list'
    this.aliases = ['listies']
    this.description = 'Shows a list of guild members'
  }

  onCommand(message) {
    this.sendMinecraftMessage(`/g list`)
  }
}

module.exports = OnlineCommand
