# Pump.fun Memecoin Trading Bot (TypeScript CLI)

Professional AI-assisted trading framework for Pump.fun and Solana memecoin workflows.  
This project upgrades a legacy Pump.fun automation concept into a modular **Pump.fun trading bot** with token scanning, AI validation, sniping, risk controls, and portfolio management.

---

## Overview

This repository is designed for builders and advanced users who want to operate a **Pump.fun bot** or **Pumpfun trading bot** from a command line dashboard with configurable logic.

Core idea:
1. Detect new launches quickly.
2. Filter aggressively using AI + on-chain heuristics.
3. Execute fast entries with priority fees.
4. Manage risk with strict stop-loss/take-profit rules.
5. Track results and continuously tune strategy.

---

## Key Features

### 1) Real-time Token Scanner
- Monitors newly launched tokens from Pump API and on-chain program logs.
- Captures metadata including mint, creator, launch timestamp, and additional raw context.
- Persists scan history in local storage for audit and backtesting.

### 2) AI + Heuristic Validation Engine
- Uses OpenAI to score each candidate token using structured prompt context.
- Combines AI output with hard filters:
  - social footprint checks (optional)
  - suspicious keyword detection
  - mint/freeze authority heuristics
  - early momentum proxy
- Standard output format:
  - `score` (0-100)
  - `reasoning`
  - `action` (`BUY` or `SKIP`)

### 3) Sniper Execution Engine
- Builds fast transactions with:
  - compute unit limit instructions
  - priority fee bidding
  - simulation before sending
- Supports manual and auto-snipe flows.
- Designed for extension into full Pump.fun instruction encoding and Jito routing.

### 4) Bundling and Multi-Wallet Coordination
- Bundle module can batch multiple wallet actions in one execution cycle.
- Useful for advanced entries/exits and coordinated strategy execution.
- Toggle with `BUNDLE_ENABLED`.

### 5) Portfolio and Trade Management
- Tracks open and closed positions with realized PnL.
- Supports stop-loss, take-profit, trailing stop configuration.
- Provides live CLI summaries for active positions and performance.

### 6) Proxy and Reliability Layer
- Rotates proxies from `proxy_list.json` for outbound requests.
- Helps reduce request concentration and API rate-limit pressure.

### 7) Interactive Trading Dashboard (CLI)
- Start Scanner
- Stop Scanner
- View Recent Scans / Tokens
- View Portfolio
- Manual Snipe (by mint)
- Exit Position
- Settings
- Exit

---

## Architecture

- `src/index.ts` - bootstrap
- `src/runtime.ts` - wiring and dependency container
- `src/config.ts` - environment-driven configuration
- `src/scanner.ts` - launch discovery
- `src/analyzer.ts` - AI + heuristic scoring
- `src/trader.ts` - execution and transaction build flow
- `src/bundler.ts` - bundle abstraction layer
- `src/portfolio.ts` - position lifecycle + PnL
- `src/storage.ts` - persistent local state
- `src/proxy.ts` - proxy rotation
- `src/cli.ts` - dashboard and operator commands

---

## Execution Logic (Detailed)

1. **Scanner event arrives** with mint + launch metadata.  
2. **Analyzer enriches data** (on-chain checks + optional social checks).  
3. **OpenAI scoring** returns structured JSON decision.  
4. If score >= threshold and action is BUY, **sniper engine executes** with priority settings.  
5. **Position opens** and gets tracked in portfolio store.  
6. **Risk rules** (SL/TP/trailing/manual exit) manage lifecycle.  
7. Results are logged for future parameter tuning.

---

## How to Improve Success and Profitability (Risk-Managed)

No trading bot can guarantee profit. Real performance comes from risk control + disciplined iteration.

Recommended framework:
- Use small position size first (`SNIPE_AMOUNT_SOL=0.01` or less).
- Keep strict stop-loss (`STOP_LOSS_PERCENT` low, e.g. 6-10%).
- Start with high AI threshold (`AI_VALIDATION_THRESHOLD=80+`) to reduce noise.
- Enable social checks, but treat social signals as weak evidence unless confirmed on-chain.
- Track metrics weekly:
  - win rate
  - average R multiple
  - max drawdown
  - slippage/fill quality
- Increase size only after statistically meaningful positive expectancy.
- Use separate wallets per strategy archetype for cleaner analytics.

Practical strategy improvements:
- Add blacklist/whitelist creator wallet logic.
- Add time-based invalidation (skip if entry is late after launch).
- Add volatility-adaptive TP/SL.
- Add fail-safe cooldown after consecutive losses.

---

## Integrations You Can Add

- **RPC providers:** Helius, Triton, QuickNode
- **Bundle relays:** Jito APIs / custom relay pipelines
- **Data sources:** DexScreener, Birdeye, social sentiment providers
- **Notifications:** Telegram/Discord/Slack alerts
- **Persistence:** SQLite/Postgres for advanced analytics
- **Observability:** structured log shipping + metrics dashboards

---

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
copy .env.example .env
```

3. Edit `.env` with your keys and risk settings.

4. Start CLI:
```bash
npm run dev
```

---

## Environment Variables

- `RPC_HTTP_ENDPOINT` - Solana HTTP RPC endpoint  
- `RPC_WS_ENDPOINT` - Solana WebSocket RPC endpoint  
- `OPENAI_KEY` - OpenAI API key  
- `BOT_KEY` - main trading wallet private key (base58)  
- `EXTRA_WALLET_KEYS` - optional comma-separated extra wallets  
- `JITO_AUTH_KEY` - optional Jito auth key  
- `PUMP_PROGRAM_ID` - Pump.fun program id  
- `AI_VALIDATION_THRESHOLD` - minimum score for auto-buy  
- `SNIPE_AMOUNT_SOL` - SOL size per entry  
- `SLIPPAGE_BPS` - max slippage  
- `PRIORITY_FEE_LAMPORTS` - fee priority for faster inclusion  
- `STOP_LOSS_PERCENT` - stop-loss percentage  
- `TAKE_PROFIT_PERCENT` - take-profit percentage  
- `TRAILING_STOP_PERCENT` - trailing stop percentage  
- `SCAN_INTERVAL_MS` - scanner poll interval  
- `BUNDLE_ENABLED` - bundle mode toggle  
- `SOCIAL_CHECK_ENABLED` - social checks toggle  
- `MAX_RECENT_TOKENS` - local scan history cap  
- `LOG_LEVEL` - logging verbosity

---

## Security and Operational Guidelines

- Never commit real `.env` values.
- Use a dedicated hot wallet with limited balance.
- Keep backups of strategy settings and trade logs.
- Validate all execution paths on devnet/small size before scaling.
- Monitor RPC errors and fail rates continuously.

---

## Disclaimer

This is a high-risk trading automation tool.  
There is no guarantee of profits. You are fully responsible for losses, operational risk, and legal compliance in your jurisdiction.

---

## Search Keywords

pumpfu trading bot, Pump.fun bot, Pumpfun trading bot, Pumpfun comment bot, Pump.fun automation, Solana trading bot, Solana meme coin bot, token engagement bot, AI crypto bot, OpenAI trading bot, Pumpfun volume support, Pumpfun marketing bot, crypto community growth bot, on-chain token promotion bot, automated comment posting, Pump.fun CLI bot
