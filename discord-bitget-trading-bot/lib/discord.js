const { Client, GatewayIntentBits, Partials } = require('discord.js');
const placeOrder = require('./bitget');
const parseMessage = require('./parser');
require('dotenv').config();

console.log("Initializing Discord Client...");

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

        // Assume we fetch balance from some API, for simplicity let's use a constant value
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
            throw err; // Throw the error to be caught in the API handler
        });
}

function stopBot() {
    console.log("Stopping bot...");
    return client.destroy()
        .then(() => console.log("Bot stopped successfully"))
        .catch(err => {
            console.error("Error stopping bot:", err);
            throw err; // Throw the error to be caught in the API handler
        });
}

module.exports = { startBot, stopBot, client };

