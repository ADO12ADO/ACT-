import { stopBot, client } from '../../lib/discord';

export default function handler(req, res) {
    if (req.method === 'POST') {
        if (client.isReady()) {
            stopBot().then(() => {
                res.status(200).json({ message: 'Bot stopped' });
            }).catch((error) => {
                res.status(500).json({ error: 'Failed to stop bot', details: error });
            });
        } else {
            res.status(200).json({ message: 'Bot is not running' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
