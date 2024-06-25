// lib/discord.js
const { Client, GatewayIntentBits } = require('discord.js');
const placeOrder = require('./bitget');
const parseMessage = require('./parser');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log('Discord bot ready!');
});

client.on('messageCreate', async (message) => {
    if (message.channel.id === process.env.DISCORD_CHANNEL_ID && !message.author.bot) {
        console.log('Message received:', message.content);
        const { token, entryPrice, invalidationLevel, targetPrices } = parseMessage(message.content);
        
        // Assume we fetch balance from some API, for simplicity let's use a constant value
        const balance = 10000; // Example balance
        await placeOrder(token, entryPrice, invalidationLevel, targetPrices, balance);
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);

module.exports = client;
