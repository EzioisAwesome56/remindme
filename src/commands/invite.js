exports.run = async function (Bot, msg) {
    Bot.sendMessage(msg.channel.id, { embed: {
        color: Bot.config.embedColor,
        /*description: `Click [here](https://discordapp.com/oauth2/authorize?permissions=27648&scope=bot&client_id=${Bot.client.user.id}) to invite me to your server!`*/
		description: `This bot is currently configured to be a private bot, and as such, cannot be invited`
    }});
};

exports.props = {
    name        : 'invite',
    usage       : '{command}',
    aliases     : [],
    description : 'Returns an invite for RemindMeBot and the support server.'
};