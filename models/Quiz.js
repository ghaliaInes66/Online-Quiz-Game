const mongoose = require('mongoose');

const QuizSchema = mongoose.Schema({
  category: {
    type : String,
    required: [true, 'Please provide a category!']
  },
  question: {
    type : String,
    required : [true, 'Please provide a question!']
  },
  options: {
    type: [
      {
        option: {
          type :String,
          required: [true,'Please enter an option!'],
        },
        isCorrect: {
          type: Boolean,
          default: false
        }
      }
    ],
    required: [true, 'Please provide options!']
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Please provide user Id!']
  }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema)