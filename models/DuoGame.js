const mongoose = require('mongoose');

const DuoSchema = mongoose.Schema({
  firstUser: {
    type: mongoose.Types.ObjectId,
    required: [true,'Please provide first user Id']
  },
  secondUser: {
    type: mongoose.Types.ObjectId,
    required: [true,'Please provide second user Id']
  },
  firstUserScore: {
    type: Number,
    default: 0
  },
  secondUserScore: {
    type: Number,
    default: 0
  },
  category: {
    type : String,
    required: [true, 'Please provide a category!']
  },
  quizzes: {
    type: [
      {
        quizId: {
          type: mongoose.Types.ObjectId,
          required: [true, 'please peovide quiz id!']
        },
        firstUserAnswer: {
          type: String,
          default: ''
        },
        secondUserAnswer: {
          type: String,
          default: ''
        }
      }
    ]
  }
}, { timestamps: true });

module.exports = mongoose.model('DuoGame', DuoSchema)