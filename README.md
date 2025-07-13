<div align="center">
  <picture width="150" height="150">
    <img src="./dapp/public/hero-ss.png" alt="engaged hero landing page" width="800"">
  </picture>
  <br />
  <h1>ENGAGED</h1>
  <p><strong>Decentralized, top sports fan platform</strong></p>

</div>

Sport clubs and athletes struggle to keep fans engaged beyond time when biggest competitions are happening. Fans participate in sports only passively by watching games. ENGAGED changes this by allowing clubs to create challenges for their audience to compete on a global scale.

### Token Staking System

Shows owned vs staked tokens
4-tier staking system (Bronze/Silver/Gold/Platinum) with different benefits
Staking modal with tier selection
Withdraw functionality for staked tokens
Additional stat cards showing APY, tier level, rewards, and USD value

### Dual Content Feeds

Exclusive Feed: Token-gated content based on staking tier
Community Feed: User-generated content accessible to all
Posts show tier requirements and lock content appropriately
Like, comment, and share functionality

### Challenge System

Active challenges with entry fees in fan tokens
Difficulty levels (easy/medium/hard) with color coding
Participant tracking and reward systems
Join functionality that checks token ownership
Status indicators (active/upcoming/completed)

## Deployment

**Chiliz Testnet:**

- `Test Fan Token: 0x2F9a4078A4390B18b28CcdB19B281b6AA9Bc22Dc`
- `Quests Contract: 0x3c4681c4195DeE07710b34E47ad01e767F09C3f7`

## Features

- smart contracts
  - quests + rewards ✅ (V1, V2)
  - content creation
- Dapp
  - pages:
    - landing ✅
    - home ✅
    - team ✅
      - token-gated content feed
      - user-generated content feed
      - challenges
    - quest ✅
    - user page
    - rewards (?)
  - features:
    - twitter integration
    - contract reads
    - contract writes
    - polished UI ✅
    - animations ✅
    - graphics ✅
    - socios wallet integration ✅
- Backend API
  - indexer
  - account abstraction
- Telegram bot

## Setup

### Dapp

- `cd dapp`
- `npm i`
- `npm run dev`

### Contracts

- todo

### Backend

- `cd backend`
- `npm i`
- `npm run dev`
