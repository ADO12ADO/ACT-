// lib/parser.js

function parseMessage(message) {
    const lines = message.split('\n');
    const token = lines[0].match(/\$(\w+)/)[1];
    const entryPrice = parseFloat(lines.find(line => line.includes('Entry Price')).split(':')[1].trim());
    const invalidationLevel = parseFloat(lines.find(line => line.includes('Invalidation Level')).split(':')[1].trim());
    const targetPrices = lines.find(line => line.includes('Target Price')).split(':')[1].trim().split('|').map(price => parseFloat(price.trim()));

    return { token, entryPrice, invalidationLevel, targetPrices };
}

module.exports = parseMessage;
