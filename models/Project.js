// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  todos: [
    {
      description: String,
      status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
      createdDate: { type: Date, default: Date.now },
      updatedDate: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Project', projectSchema);
