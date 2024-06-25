const { Client, GatewayIntentBits, Partials } = require('discord.js');
const placeOrder = require('./bitget');
const parseMessage = require('./parser');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.once('ready', () => {
    console.log('Discord bot ready!');
});

client.on('messageCreate', async (message) => {
    if (message.channel.id === process.env.DISCORD_CHANNEL_ID && !message.author.bot) {
        console.log('Message received:', message.content);
        const { token, entryPrice, invalidationLevel, targetPrices } = parseMessage(message.content);

        const balance = 10000; // Example balance
        await placeOrder(token, entryPrice, invalidationLevel, targetPrices, balance);
    }
});

function startBot() {
    console.log("Starting bot...");
    return client.login(process.env.DISCORD_BOT_TOKEN)
        .then(() => console.log("Bot started successfully"))
        .catch(err => {
            console.error("Error starting bot:", err);
            throw err; 
        });
}

function stopBot() {
    console.log("Stopping bot...");
    return client.destroy()
        .then(() => console.log("Bot stopped successfully"))
        .catch(err => {
            console.error("Error stopping bot:", err);
            throw err; 
        });
}

module.exports = { startBot, stopBot, client };
