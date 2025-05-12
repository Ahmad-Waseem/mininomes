const mongoose = require('mongoose');

const genomeSchema = new mongoose.Schema({
  originalLength: {
    type: Number,
    required: true
  },
  compressedData: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Genome || mongoose.model('Genome', genomeSchema); 