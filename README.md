# Pump.fun AI Comment Bot (TypeScript)

This project is a **TypeScript CLI automation bot** for Pump.fun comments on Solana.
It is designed for traders or communities who want to keep token discussions active with AI-assisted comment generation and automated posting.

## What This Bot Is For

- Keep a token thread active with regular, varied comments
- Speed up comment creation by generating text with OpenAI
- Run posting from either a fresh generated wallet or an existing wallet
- Maintain a reusable local comment bank in `data.json`

## Core Features

- **AI comment generation**: Creates comment ideas from a short prompt
- **Manual comment input**: Add your own custom comments anytime
- **Comment library management**: Read and reuse saved comments from `data.json`
- **Automated posting loop**: Posts comments to a target Pump token mint
- **Proxy support**: Uses entries in `proxy_list.json` while posting
- **Flexible wallet mode**:
  - New temporary wallet mode
  - Existing wallet mode via `BOT_KEY` in `.env`

## How It Works

1. Start CLI with `npm run dev`.
2. Choose to generate comments with AI or add comments manually.
3. Comments are stored in `data.json`.
4. Run the comment bot from:
   - a new generated wallet, or
   - your existing `.env` wallet (`BOT_KEY`).
5. Bot logs in, gets token/session data, then posts comments to `PUMP_MINT`.
6. Bot waits a random interval between posts using `COMMENT_MIN_INTERVAL` and `COMMENT_MAX_INTERVAL`.

## Benefits For Traders

- **Save time**: reduce manual writing effort for every post
- **Stay active**: maintain continuous engagement on token pages
- **Simple workflow**: menu-based CLI, no complex dashboard needed
- **Configurable pace**: control post frequency with interval settings
- **Reusable content**: build your own comment set over time

## Tech Stack

- Node.js + TypeScript
- `ts-node` for running scripts
- OpenAI API for AI comment generation
- Solana `@solana/web3.js`

## Prerequisites

- Node.js 18+ (recommended)
- npm
- A valid OpenAI API key
- A Solana wallet private key (base58) if using existing wallet mode

## Setup

1. Clone repository

```bash
git clone https://github.com/jackhuang166/Pumpfun_AI_Trading_Bot.git
cd Pumpfun_AI_Trading_Bot
```

2. Install dependencies (npm only)

```bash
npm install
```

3. Create env file

```bash
copy .env.example .env
```

Then edit `.env` values.

4. Run bot

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start the interactive CLI bot
- `npm run test` - Run `src/test.ts` helper script

## Environment Variables

These variables are used by `src/config.ts`:

- `OPENAI_KEY` - OpenAI API key for generating comments
- `PUMP_MINT` - Pump token mint address to comment on
- `BOT_KEY` - Base58-encoded Solana private key (required for existing wallet mode)
- `COMMENT_MIN_INTERVAL` - Minimum delay between comments (ms)
- `COMMENT_MAX_INTERVAL` - Maximum delay between comments (ms)

See `.env.example` for trader-friendly descriptions and examples.

## Data Files

- `data.json` - Stores comment strings
- `proxy_list.json` - Proxy list used by comment posting

## CLI Flow

When running `npm run dev`, the bot shows menu options:

- Generate AI comments
- Input comments manually
- View saved comments
- Run comment bot (new wallet or existing wallet from `.env`)

## Security Notes

- Never commit your real `.env` file.
- Keep `BOT_KEY` private.
- Use a dedicated wallet with limited funds for automation.

## Contact

Telegram: [@luukogood](https://t.me/luukogood)

## Disclaimer

Use at your own risk. Automated bot usage may violate third-party platform policies and can result in financial or account risk.

## Keywords

Pump.fun bot, Pumpfun trading bot, Pumpfun comment bot, Pump.fun automation, Solana trading bot, Solana meme coin bot, token engagement bot, AI crypto bot, OpenAI trading bot, Pumpfun volume support, Pumpfun marketing bot, crypto community growth bot, on-chain token promotion bot, automated comment posting, Pump.fun CLI bot
