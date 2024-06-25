// pages/index.js
import { useState } from 'react';

export default function Home() {
    const [status, setStatus] = useState('Bot not started');

    const startBot = async () => {
        setStatus('Starting bot...');
        const response = await fetch('/api/start-bot', { method: 'POST' });
        const data = await response.json();
        if (response.ok) {
            setStatus(data.message);
        } else {
            setStatus(data.error);
        }
    };

    const stopBot = async () => {
        setStatus('Stopping bot...');
        const response = await fetch('/api/stop-bot', { method: 'POST' });
        const data = await response.json();
        if (response.ok) {
            setStatus(data.message);
        } else {
            setStatus(data.error);
        }
    };

    return (
        <div>
            <h1>Discord Bitget Trading Bot</h1>
            <button onClick={startBot}>Start Bot</button>
            <button onClick={stopBot}>Stop Bot</button>
            <p>Status: {status}</p>
        </div>
    );
}
