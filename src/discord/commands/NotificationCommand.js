const DiscordCommand = require('../../contracts/DiscordCommand')

class NotificationCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'notifications'
    this.aliases = ['n', 'notification']
    this.description = 'Toggles guild join / leave notifications.'
  }

  onCommand(message) {
    let args = this.getArgs(message)

    this.sendMinecraftMessage(`/g notifications`)
  }
}

module.exports = NotificationCommand
