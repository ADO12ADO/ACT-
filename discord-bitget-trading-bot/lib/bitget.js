// lib/bitget.js
const axios = require('axios');
const { someUtilityFunction } = require('./util'); // Importe utilitas jika diperlukan
require('dotenv').config();

const instance = axios.create({
    baseURL: 'https://api.bitget.com/api',
    headers: {
        'Content-Type': 'application/json',
        'ACCESS-KEY': process.env.BITGET_API_KEY,
        'ACCESS-SIGN': process.env.BITGET_API_SECRET,
        'ACCESS-TIMESTAMP': Date.now().toString(),
        'ACCESS-PASSPHRASE': process.env.BITGET_API_PASSPHRASE,
    }
});

async function placeOrder(token, entryPrice, invalidationLevel, targetPrices, balance) {
    const side = entryPrice < targetPrices[0] ? 'buy' : 'sell';
    const quantity = (balance * 0.03) / entryPrice;

    const order = {
        symbol: `${token}USDT`,
        side: side,
        type: 'limit',
        quantity: quantity.toFixed(4),
        price: entryPrice,
        stopLoss: invalidationLevel,
        takeProfit: targetPrices[0],
        leverage: Math.floor(balance / (entryPrice - invalidationLevel))
    };

    try {
        const response = await instance.post('/spot/v1/trade/orders', order);
        console.log('Order placed:', response.data);
    } catch (error) {
        console.error('Error placing order:', error);
    }
}

module.exports = placeOrder;
