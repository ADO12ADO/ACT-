# Discord Bitget Trading Bot

This is a simple trading bot that listens for messages on a Discord channel and places trades on Bitget.

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env.local` file in the root directory and add your environment variables.
4. Run the development server: `npm run dev`
5. Deploy to Vercel for production.

## Environment Variables

- `DISCORD_BOT_TOKEN`: Your Discord bot token
- `DISCORD_CHANNEL_ID`: The ID of the Discord channel to listen to
- `BITGET_API_KEY`: Your Bitget API key
- `BITGET_API_SECRET`: Your Bitget API secret
- `BITGET_API_PASSPHRASE`: Your Bitget API passphrase
