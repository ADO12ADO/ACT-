import { startBot, client } from '../../lib/discord';

export default function handler(req, res) {
    if (req.method === 'POST') {
        if (!client.isReady()) {
            startBot().then(() => {
                res.status(200).json({ message: 'Bot started' });
            }).catch((error) => {
                res.status(500).json({ error: 'Failed to start bot', details: error });
            });
        } else {
            res.status(200).json({ message: 'Bot already running' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
