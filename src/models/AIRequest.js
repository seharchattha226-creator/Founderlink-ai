
const mongoose = require('mongoose');

const AIRequestSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Please provide request type'],
      enum: ['idea', 'analysis', 'roadmap'],
    },
    input: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'Please provide input data'],
    },
    output: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'Please provide output data'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user ID'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AIRequest', AIRequestSchema);
