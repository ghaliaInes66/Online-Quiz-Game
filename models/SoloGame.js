const mongoose = require('mongoose');

const SoloSchema = mongoose.Schema({
  category: {
    type : String,
    required: [true, 'Please provide a category!']
  },
  score: {
    type: Number,
    default: 0
  },
  quizzes: {
    type: [
      {
        quizId: {
          type: mongoose.Types.ObjectId,
          required: [true, 'please provide quiz id!']
        },
        answer: {
          type: String,
          default: ''
        }
      }
    ]
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, 'please provide user id!']
  }
}, { timestamps: true });

module.exports = mongoose.model('SoloGame', SoloSchema)