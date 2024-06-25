import { startBot, client } from '../../lib/discord';

export default async function handler(req, res) {
    console.log("Received request to start bot...");
    if (req.method === 'POST') {
        if (!client.isReady()) {
            try {
                await startBot();
                res.status(200).json({ message: 'Bot started' });
            } catch (error) {
                console.error("Error during bot start:", error);
                res.status(500).json({ error: 'Failed to start bot', details: error.message });
            }
        } else {
            res.status(200).json({ message: 'Bot already running' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
