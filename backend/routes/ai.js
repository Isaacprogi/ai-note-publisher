const express = require('express');
const axios = require('axios');
const Note = require('../models/Note');
const router = express.Router();

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Generate note with AI
router.post('/generate', async (req, res) => {
  try {
    const { prompt} = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await axios.post(GROQ_API_URL, {
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [{
        role: "user",
        content: `Create a detailed note about: ${prompt}. Make it informative and well-structured.`
      }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      }
    });

    const aiContent = response.data.choices[0].message.content;

    // Create and save the note
    const note = new Note({
      prompt: `AI Generated: ${prompt.substring(0, 50)}...`,
      content: aiContent,
      isAiGenerated: true,
      aiPrompt: prompt,
      tags: ['ai-generated']
    });

    await note.save();
    res.json(note);

  } catch (error) {
    console.error('AI Generation Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate AI content' });
  }
});

// Improve existing note with AI
router.post('/improve/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const response = await axios.post(GROQ_API_URL, {
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [{
        role: "user",
        content: `Improve and enhance this note while keeping the main ideas. Make it more detailed and better structured:\n\n${note.content}`
      }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      }
    });

    const improvedContent = response.data.choices[0].message.content;
    
    note.content = improvedContent;
    note.isAiGenerated = true;
    await note.save();

    res.json(note);

  } catch (error) {
    console.error('AI Improvement Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to improve note with AI' });
  }
});

module.exports = router;