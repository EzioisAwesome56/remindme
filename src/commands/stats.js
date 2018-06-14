const os = require('os');
const totalMem = os.totalmem();
const moment = require('moment'); require('moment-duration-format');
const ErisVersion = require('../../node_modules/eris/package.json').version;

exports.run = async function (Bot, msg) {
    const memUsage = process.memoryUsage().rss;
    Bot.sendMessage(msg.channel.id, { embed: {
        color: Bot.config.embedColor,
        title: `RemindMeBot ${Bot.package.version}`,
        url: 'https://github.com/EzioisAwesome56/remindme',
        fields: [
            { name: 'Guilds', value: Bot.client.guilds.size, inline: true },
            { name: 'Uptime', value: moment.duration(process.uptime(), 'seconds').format('dd:hh:mm:ss'), inline: true },
            { name: 'Ping', value: `${msg.channel.guild.shard.latency.toFixed()} ms`, inline: true },
            { name: 'RAM Usage', value: `${(memUsage / 1048576).toFixed()}MB/${(totalMem / 1073741824).toFixed(1)} GB\n(${(memUsage / totalMem * 100).toFixed(2)}%)`, inline: true
            },
            { name: 'System Info', value: `${process.platform} (${process.arch})\n${(os.totalmem() > 1073741824 ? `${(os.totalmem() / 1073741824).toFixed(1)} GB` : `${(os.totalmem() / 1048576).toFixed(2)} MB`)}`, inline: true },
            { name: 'Libraries', value: `[Eris](https://abal.moe/Eris) v${ErisVersion}\n[Node.js](https://nodejs.org/en/) ${process.version}`, inline: true },
            { name: 'Links', value: '[GitHub](https://github.com/EzioisAwesome56/remindme)' },
        ],
        footer: { text: 'Created by Aetheryx#2222, Modifyed by Not jon#2875' }
    }});
};

exports.props = {
    name        : 'stats',
    usage       : '{command}',
    aliases     : ['info'],
    description : 'Returns information and statistics about RemindMeBot.'
};