const EventHandler = require('../../contracts/EventHandler')
class StateHandler extends EventHandler {
  constructor(minecraft, command) {
    super()
    
    this.minecraft = minecraft
    this.command = command
  }

  registerEvents(bot) {
    this.bot = bot
    this.online = false
    this.onlineMsg = ""

    this.bot.on('message', (...args) => this.onMessage(...args))

  }


  onMessage(event) {
    const message = event.toString().trim()
    
    if (this.online===false) {


      if (this.isLobbyJoinMessage(message)) {
        this.minecraft.app.log.minecraft('Sending Minecraft client to limbo')
        return this.bot.chat('§')
      }

      if (this.isFullMessage(message)) {
        return this.minecraft.broadcastHeadedEmbed({
          message: `The guild is at maximum capacity.`,
          title: `Guild Full`,
          color: '47F049'
        })
      }

      if (this.isLoginMessage(message)) {
        let user = message.split(" ")[2]

        return this.minecraft.broadcastPlayerToggle({ username: user, message: `joined.`, color: '47F049' })
      }

      if (this.isLogoutMessage(message)) {
        let user = message.split(" ")[2]

        return this.minecraft.broadcastPlayerToggle({ username: user, message: `left.`, color: 'F04947' })
      }

      if (this.isJoinMessage(message)) {
        let user = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[0]

        return this.minecraft.broadcastHeadedEmbed({
          message: `${user} joined the guild!`,
          title: `Member Joined`,
          icon: `https://mc-heads.net/avatar/${user}`,
          color: '47F049'
        })
      }
      
      if (this.isOnlineMessage(message)) {
        this.online = true;
      }


      if (this.isLeaveMessage(message)) {
        let user = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[0]

        return this.minecraft.broadcastHeadedEmbed({
          message: `${user} left the guild!`,
          title: `Member Left`,
          icon: `https://mc-heads.net/avatar/${user}`,
          color: 'F04947'
        })
      }

      if (this.isNotificationMessage(message)) {
        return this.minecraft.broadcastHeadedEmbed({
          message: `${message}`,
          title: `Guild Notifications`,
          color: '47F049'
        })
      }

      if (this.isKickMessage(message)) {
        let user = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[0]

        return this.minecraft.broadcastHeadedEmbed({
          message: `${user} was kicked from the guild!`,
          title: `Member Kicked`,
          icon: `https://mc-heads.net/avatar/${user}`,
          color: 'F04947'
        })
      }

      if (this.isPromotionMessage(message)) {
        let username = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[0]
        let newRank = message.replace(/\[(.*?)\]/g, '').trim().split(' to ').pop().trim()

        return this.minecraft.broadcastCleanEmbed({ message: `${username} was promoted to ${newRank}`, color: '47F049' })
      }

      if (this.isDemotionMessage(message)) {
        let username = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[0]
        let newRank = message.replace(/\[(.*?)\]/g, '').trim().split(' to ').pop().trim()

        return this.minecraft.broadcastCleanEmbed({ message: `${username} was demoted to ${newRank}`, color: 'F04947' })
      }

      if (this.isBlockedMessage(message)) {
        let blockedMsg = message.match(/".+"/g)[0].slice(1, -1)

        return this.minecraft.broadcastCleanEmbed({ message: `Message \`${blockedMsg}\` blocked by Hypixel.`, color: 'DC143C' })
      }

      if (this.isRepeatMessage(message)) {
        return this.minecraft.broadcastCleanEmbed({ message: `You cannot say the same message twice!`, color: 'DC143C' })
      }

      if (this.isNoPermission(message)) {
        return this.minecraft.broadcastCleanEmbed({ message: `I don't have permission to do that!`, color: 'DC143C' })
      }

      if (this.isIncorrectUsage(message)) {
        return this.minecraft.broadcastCleanEmbed({ message: message.split("'").join("`"), color: 'DC143C' })
      }

      if (this.isOnlineInvite(message)) {
        let user = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[2]

        return this.minecraft.broadcastCleanEmbed({ message: `${user} was invited to the guild!`, color: '47F049' })
      }

      if (this.isOfflineInvite(message)) {
        let user = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[6].match(/\w+/g)[0]

        return this.minecraft.broadcastCleanEmbed({ message: `${user} was offline invited to the guild!`, color: '47F049' })
      }

      if (this.isFailedInvite(message)) {
        return this.minecraft.broadcastCleanEmbed({ message: message.replace(/\[(.*?)\]/g, '').trim(), color: 'DC143C' })
      }

      if (this.isGuildMuteMessage(message)) {
        let time = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[7]

        return this.minecraft.broadcastCleanEmbed({ message: `Guild Chat has been muted for ${time}`, color: 'F04947' })
      }

      if (this.isGuildUnmuteMessage(message)) {
        return this.minecraft.broadcastCleanEmbed({ message: `Guild Chat has been unmuted!`, color: '47F049' })
      }

      if (this.isUserMuteMessage(message)) {
        let user = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[3].replace(/[^\w]+/g, '')
        let time = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[5]

        return this.minecraft.broadcastCleanEmbed({ message: `${user} has been muted for ${time}`, color: 'F04947' })
      }

      if (this.isUserUnmuteMessage(message)) {
        let user = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[3]

        return this.minecraft.broadcastCleanEmbed({ message: `${user} has been unmuted!`, color: '47F049' })
      }

      if (this.isSetrankFail(message)) {
        return this.minecraft.broadcastCleanEmbed({ message: `Rank not found.`, color: 'DC143C' })
      }

      if (this.isAlreadyMuted(message)) {
        return this.minecraft.broadcastCleanEmbed({ message: `This user is already muted!`, color: 'DC143C' })
      }

      if (this.isNotInGuild(message)) {
        let user = message.replace(/\[(.*?)\]/g, '').trim().split(' ')[0]

        return this.minecraft.broadcastCleanEmbed({ message: `${user} is not in the guild.`, color: 'DC143C' })
      }

      if (this.isLowestRank(message)) {
        let user = message.replace(/\[(.*?)\]/g, '').trim().split(' ')[0]

        return this.minecraft.broadcastCleanEmbed({ message: `${user} is already the lowest guild rank!`, color: 'DC143C' })
      }

      if (this.isAlreadyHasRank(message)) {
        return this.minecraft.broadcastCleanEmbed({ message: `They already have that rank!`, color: 'DC143C' })
      }

      if (this.isTooFast(message)) {
        return this.minecraft.app.log.warn(message)
      }

      if (this.isPlayerNotFound(message)) {
        let user = message.split(' ')[8].slice(1, -1)

        return this.minecraft.broadcastCleanEmbed({ message: `Player \`${user}\` not found.`, color: 'DC143C' })
      }

      if (this.isJoinRequest(message)) {
        const fs = require('fs');

        let rawdata = fs.readFileSync('config.json');
        let config = JSON.parse(rawdata);

        if (message.includes("[VIP]") || message.includes("[VIP+]") || message.includes("[MVP]") || message.includes("[MVP+]") || message.includes("[MVP++]")) {
          let user = message.split(' ')[1]
          user = user.replace('-----------------------------------------------------', '')
          user = user.replace('\n', '')
          if (config.discord.autoAccept===true){
            this.bot.chat(`/g accept ${user}`)
          }
          return this.minecraft.broadcastCleanEmbed({ message: `${user} has requested to join the guild.`, color: '47F049' })

          
        } else {
          let user = message.split(' ')[0]
          user = user.replace('-----------------------------------------------------', '')
          user = user.replace('\n', '')
          if (config.discord.autoAccept===true){
            this.bot.chat(`/g accept ${user}`)
          }

          return this.minecraft.broadcastCleanEmbed({ message: `${user} has requested to join the guild.`, color: '47F049' })
        }

        
        
        
      }

      if (!this.isGuildMessage(message)) {
        return
      }

      let parts = message.split(':')
      let group = parts.shift().trim()
      let hasRank = group.endsWith(']')

      let userParts = group.split(' ')
      let username = userParts[userParts.length - (hasRank ? 2 : 1)]
      let guildRank = userParts[userParts.length - 1].replace(/[\[\]]/g, '')

      if (guildRank == username) {
        guildRank = 'Member'
      }

      if (this.isMessageFromBot(username)) {
        return
      }

      const playerMessage = parts.join(':').trim()
      if (playerMessage.length == 0 || this.command.handle(username, playerMessage)) {
        return
      }

      if (playerMessage == '@') {
        return
      }

      this.minecraft.broadcastMessage({
        username: username,
        message: playerMessage,
        guildRank: guildRank,
      })

    } else {
      this.onlineMsg += message;
      this.onlineMsg += "\n";
      if (message.includes("Online Members:") || message.includes("Miembros en Línea:")) {
        this.online = false
        let embed = this.minecraft.broadcastHeadedEmbed({
          message: `${this.onlineMsg}`,
          title: `Guild Members`,
          color: '47F049'
        });
        this.onlineMsg = "";
        return embed
      }
      
    }


    
  }

  isMessageFromBot(username) {
    return this.bot.username === username
  }

  isLobbyJoinMessage(message) {
    return (message.endsWith(' the lobby!') || message.endsWith(' the lobby! <<<')) && message.includes('[MVP+')
  }

  isNotificationMessage(message) {
    return (message.endsWith(' guild join/leave notifications!') || message.endsWith(' las notificaciones de entrar/salir!'))
  }

  isFullMessage(message) {
    return message.includes('Your guild is full!')
  }

  isOnlineMessage(message) {
    console.log(message);

    return message.startsWith('Guild Name:') || message.startsWith('Nombre de la Guild:')
  }

  isGuildMessage(message) {
    return message.startsWith('Guild >') && message.includes(':')
  }

  isLoginMessage(message) {
    return (message.startsWith('Guild >') && message.endsWith('joined.') && !message.includes(':')) || (message.startsWith('Guild >') && message.endsWith('entró.') && !message.includes(':'))
  }

  isLogoutMessage(message) {
    return message.startsWith('Guild >') && message.endsWith('left.') && !message.includes(':') || (message.startsWith('Guild >') && message.endsWith('salió.') && !message.includes(':'))
  }

  isJoinMessage(message) {
    return message.includes('joined the guild!') && !message.includes(':')
  }

  isLeaveMessage(message) {
    return message.includes('left the guild!') && !message.includes(':')
  }

  isKickMessage(message) {
    return message.includes('was kicked from the guild by') && !message.includes(':')
  }

  isPromotionMessage(message) {
    return message.includes('was promoted from') && !message.includes(':')
  }

  isDemotionMessage(message) {
    return message.includes('was demoted from') && !message.includes(':')
  }

  isBlockedMessage(message) {
    return message.includes('We blocked your comment') && !message.includes(':')
  }

  isRepeatMessage(message) {
    return message == 'You cannot say the same message twice!' || message == '¡No puedes decir el mismo mensaje dos veces!'
  }

  isNoPermission(message) {
    return (message.includes('You must be the Guild Master to use that command!') || message.includes('You do not have permission to use this command!') || message.includes("I'm sorry, but you do not have permission to perform this command. Please contact the server administrators if you believe that this is in error.") || message.includes("You cannot mute a guild member with a higher guild rank!") || message.includes("You cannot kick this player!") || message.includes("You can only promote up to your own rank!") || message.includes("You cannot mute yourself from the guild!") || message.includes("is the guild master so can't be demoted!") || message.includes("is the guild master so can't be promoted anymore!")) && !message.includes(":")
  }

  isIncorrectUsage(message) {
    return message.includes('Invalid usage!') && !message.includes(':')
  }

  isOnlineInvite(message) {
    return message.includes('You invited') && message.includes('to your guild. They have 5 minutes to accept.') && !message.includes(':')
  }

  isOfflineInvite(message) {
    return message.includes('You sent an offline invite to') && message.includes('They will have 5 minutes to accept once they come online!') && !message.includes(':')
  }

  isFailedInvite(message) {
    return (message.includes('is already in another guild!') || message.includes('You cannot invite this player to your guild!') || (message.includes("You've already invited") && message.includes("to your guild! Wait for them to accept!")) || message.includes('is already in your guild!')) && !message.includes(':')
  }

  isUserMuteMessage(message) {
    return message.includes('has muted') && message.includes('for') && !message.includes(':')
  }

  isUserUnmuteMessage(message) {
    return message.includes('has unmuted') && !message.includes(':')
  }

  isGuildMuteMessage(message) {
    return message.includes('has muted the guild chat for') && !message.includes(':')
  }

  isGuildUnmuteMessage(message) {
    return message.includes('has unmuted the guild chat!') && !message.includes(':')
  }

  isSetrankFail(message) {
    return message.includes("I couldn't find a rank by the name of ") && !message.includes(':')
  }

  isAlreadyMuted(message) {
    return message.includes('This player is already muted!') && !message.includes(':')
  }

  isNotInGuild(message) {
    return message.includes(' is not in your guild!') && !message.includes(':')
  }

  isLowestRank(message) {
    return message.includes("is already the lowest rank you've created!") && !message.includes(':')
  }

  isAlreadyHasRank(message) {
    return message.includes('They already have that rank!') && !message.includes(':')
  }

  isTooFast(message) {
    return message.includes('You are sending commands too fast! Please slow down.') && !message.includes(':')
  }

  isPlayerNotFound(message) {
    return message.startsWith(`Can't find a player by the name of`)
  }

  isJoinRequest(message) {
    return message.includes(`Click here to accept or type /guild accept `)
  }
}

module.exports = StateHandler
