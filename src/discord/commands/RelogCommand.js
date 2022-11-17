const DiscordCommand = require('../../contracts/DiscordCommand')
const talkedRecently = new Set();

class RelogCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'relog'
    this.aliases = ['r']
    this.description = 'Relogs the minecraft client after a given period of time'
  }

  onCommand(message) {
    setTimeout(() => {process.exit();}, 10000);
  }

  relogWithDelay(message, delay = 0) {
    this.discord.app.minecraft.stateHandler.exactDelay = delay * 1000
    this.discord.app.minecraft.bot.quit('Relogging')

    message.reply(`The Minecraft account have disconnected from the server! Reconnecting in ${delay == 0 ? 5 : delay} seconds.`)
  }
}

module.exports = RelogCommand
