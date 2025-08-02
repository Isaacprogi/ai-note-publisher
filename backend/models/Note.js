const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: false,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  isAiGenerated: {
    type: Boolean,
    default: false
  },
  aiPrompt: {
    type: String,
    default: ''
  },
  published: {
    type: Boolean,
    default: false
  },
  telegramMessageId: {
    type: Number,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);
