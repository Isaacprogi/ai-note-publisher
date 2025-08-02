## 🤖 Bot Setup

This project includes functionality for interacting with Telegram,database or AI APIs (Groq).

To use these features, you must set up your own bot and obtain API keys.

### 1. Create a Telegram Bot

1. Open [@BotFather](https://t.me/BotFather) on Telegram
2. Run `/newbot` and follow the instructions
3. Copy the token you receive

### 2. Set Up MongoDB

If you don’t already have a MongoDB cluster:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a new cluster
3. Create a database user with a password
4. Get your connection URI and replace `<username>`, `<password>`, and `<dbname>`:


### 3. Set Up Groq (AI API)

This project uses [Groq API](https://console.groq.com/) for generating AI responses.

#### ⚠️ Important:
You **must create a Groq API key** or modify the codebase to work with another AI provider (e.g., OpenAI, Claude).

#### 🔧 To set up Groq:

1. Go to [https://console.groq.com](https://console.groq.com) and log in or sign up
2. Generate an API key
3. Add it to your `.env` as `GROQ_API_KEY`


### 4. Create Your `.env` File

In the backend folder, create a `.env` file and add:

```bash
TELEGRAM_BOT_TOKEN=your token
GROQ_API_KEY=groq-abc1234567890examplekey
MONGODB_URI=your uri
PORT=5000
```

### 5. Install dependencies and start server

```bash
cd backend
npm install 
npm run dev
```

