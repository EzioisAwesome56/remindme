const { MongoClient } = require('mongodb');
const Eris = require('eris');
const fs   = require('fs');

const utils = require(`${__dirname}/../utils`);
const events = require(`${__dirname}/events`);

class RemindMeBot {
  constructor (config) {
    this.utils = utils;
    this.log = utils.log;

    this.config = config;
    // utils.validateConfig(config, (err) => {
    //   if (err) {
    //       this.log(`Invalid configuration, aborting:\n${err}`, 'error');
    //       process.exit(1);
    //   }
    // });

    this.commands = {};
    this.loadCommands();

    this.dbClient = null;
    this.dbConn = null;
    this.initDB();

    this.client = new Eris(this.config.keys.token, this.clientOptions);
    this.client
      .on('connect', events.onConnect.bind(this))
      .on('ready', events.onReady.bind(this))
      .on('messageCreate', events.onMessageCreate.bind(this))
      .on('guildCreate', events.onGuildCreate.bind(this))
      .on('guildDelete', events.onGuildDelete.bind(this))
      .once('ready', this.start.bind(this));

    this.client.connect();
  }

  async initDB () {
    this.dbClient = await MongoClient.connect(this.config.dbURL || 'mongodb://localhost:27017');
    this.dbConn = this.dbClient.db('remindmebot');
  }

  async loadCommands () {
    fs.readdir(`${__dirname}/commands`, (err, files) => {
      if (err) {
        return this.log(err.stack, 'error');
      }

      let failed = 0;

      files.forEach(file => {
        try {
          const command = require(`${__dirname}/commands/${file}`);
          if (command instanceof Object) {
            this.commands[command.name] = Object.assign({
              aliases: [],
              ownerOnly: false,
              usage: '{command}'
            }, command);
          }
        } catch (err) {
          failed++;
          this.log(`Failed to load command ${file}: \n${err.stack}`, 'error');
        }
      });

      this.log(`Successfully loaded ${files.length - failed}/${files.length} commands.`);
    });
  }

  async start () {

  }

  async sendMessage (target, content, isUser = false) {
    try {
      if (isUser) {
        const DMChannel = await this.client.getDMChannel(target);
        return await DMChannel.createMessage(content);
      } else {
        return await this.client.createMessage(target, content);
      }
    } catch (err) {
      if (
        !err.message.includes('Missing Permissions') &&
        !err.message.includes('Cannot send messages to this user') &&
        !err.message.includes('Missing Access')
      ) {
        this.log(err.stack, 'error');
      } else {
        return false;
      }
    }
  }

  get clientOptions () {
    return {
      disableEveryone: true,
      maxShards: 'auto',
      messageLimit: 10,
      disableEvents: {
        CHANNEL_PINS_UPDATE: true,
        USER_SETTINGS_UPDATE: true,
        USER_NOTE_UPDATE: true,
        RELATIONSHIP_ADD: true,
        RELATIONSHIP_REMOVE: true,
        GUILD_BAN_ADD: true,
        GUILD_BAN_REMOVE: true,
        TYPING_START: true,
        MESSAGE_UPDATE: true,
        MESSAGE_DELETE: true,
        MESSAGE_DELETE_BULK: true,
        VOICE_STATE_UPDATE: true
      }
    };
  }
}

module.exports = RemindMeBot;