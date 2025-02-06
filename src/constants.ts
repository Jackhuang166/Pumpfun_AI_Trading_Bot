import { PublicKey } from "@solana/web3.js";
import { COMMENT_MAX_INTERVAL, COMMENT_MIN_INTERVAL, PUMP_MINT } from "./config";
import { readJson } from "./utils";

const genAiCommentStr = `Please Input Key sentence for AI Comment Generate

Tip: Please Input concise and core sentense for AI generating.
     It'd better if there is official link and additional info for token.
`

const aboutBotStr = `Pumpfun Comment Bot v1.0

This bot helps user to create AI comments on pumpfun.
The usage method is simple.

1. Generate Comment with AI automatically ,or else Input Comment Manually.
2. Run Comment Bot

Clue: Pumpfun, Comment, Bot, Solana

If you have any question on Pumpfun Comment Bot , feel free to contact on https://t.me/wizardev`

const defaultInput = 'Provide discussing e-chat sentences about the token pumpfun on solana in an array format. Exclude any unnecessary words like "```" or "json or javascript" for chatgpt.';

const runBotPanel = (pubkey: PublicKey, isNew: boolean = true) => `Run Bot from ${isNew ? 'New' : 'Existing'} Wallet\n
PUBKEY: ${pubkey.toBase58()}
PUMP_MINT: ${PUMP_MINT}`
export {
  aboutBotStr,
  genAiCommentStr,
  defaultInput,
  runBotPanel
}