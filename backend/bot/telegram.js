const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const Note = require('../models/Note');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY;

const telegramBot = {
    start: () => {
        console.log('Telegram bot started...');

        // Command to generate and publish note
        bot.onText(/\/note (.+)/, async (msg, match) => {
            const chatId = msg.chat.id;
            const prompt = match[1];

            try {
                bot.sendMessage(chatId, '🤖 Generating note with AI...');

                // Generate content with Groq
                const response = await axios.post(GROQ_API_URL, {
                    model: "meta-llama/llama-4-scout-17b-16e-instruct",
                    messages: [{
                        role: "user",
                        content: `Create a detailed and informative note about: ${prompt}. Make it well-structured and engaging.`
                    }]
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${GROQ_API_KEY}`
                    }
                });

                const aiContent = response.data.choices[0].message.content;
                console.log('AI Content:', aiContent);

                // Save to database
                const note = new Note({
                    prompt: `Telegram: ${prompt.substring(0, 50)}...`,
                    content: aiContent,
                    isAiGenerated: true,
                    aiPrompt: prompt,
                    published: true,
                    tags: ['telegram', 'ai-generated']
                });

                await note.save();

                // Send back to Telegram
                const message = `📝 *Note Published!*\n\n*Title:* ${note.prompt}\n\n*Content:*\n${aiContent.substring(0, 1000)}${aiContent.length > 1000 ? '...' : ''}`;

                bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });

            } catch (error) {
                console.error('Telegram bot error:', error);
                bot.sendMessage(chatId, '❌ Sorry, there was an error generating the note.');
            }
        });

        // Help command
        bot.onText(/\/start|\/help/, (msg) => {
            const chatId = msg.chat.id;
            const helpMessage = `
🤖 *AI Note Publisher Bot*

Commands:
/note <topic> - Generate and publish a note about any topic

Example:
/note artificial intelligence in healthcare

The bot will generate a detailed note using AI and save it to the database.
      `;
            bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
        });

        // List recent notes
        bot.onText(/\/list/, async (msg) => {
            const chatId = msg.chat.id;

            try {
                const notes = await Note.find().sort({ createdAt: -1 }).limit(5);

                if (notes.length === 0) {
                    bot.sendMessage(chatId, 'No notes found.');
                    return;
                }

                let message = '📚 *Recent Notes:*\n\n';
                notes.forEach((note, index) => {
                    const preview = note.content.length > 50
                        ? note.content.substring(0, 50) + '...'
                        : note.content;

                    message += `${index + 1}. ${preview}\n`;
                    message += `   Created: ${note.createdAt.toLocaleDateString()}\n\n`;
                });

                bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
            } catch (error) {
                bot.sendMessage(chatId, '❌ Error fetching notes.');
            }
        });
    }
};

module.exports = telegramBot;