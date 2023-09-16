const { NotFoundError } = require('../errors');
const Quiz = require('../models/Quiz');

const getAllQuizzes = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const quizzes = await Quiz.find({ createdBy: userId });
    res.status(200).json({ success: true, quizzes });
  } catch (error) {
    console.error(error);
  }
}

const getQuiz = async (req, res, next) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      const err = new NotFoundError(`There is no Quiz with ID ${quizId}`);
      return next(err);
    }
    res.status(200).json({ success: true, quiz });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const createQuiz = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const quizData = req.body;
    quizData.createdBy = userId;
    const newQuiz = new Quiz(quizData);
    await newQuiz.save();
    res.status(201).json({ success: true, quiz: newQuiz });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const updateQuiz = async (req, res, next) => {
  try {
    const quizId = req.params.id;
    const updatedQuizData = req.body;
    const quiz = await Quiz.findByIdAndUpdate(quizId, updatedQuizData, { new: true });
    if (!quiz) {
      const err = new NotFoundError(`There is no Quiz with ID ${quizId}`);
      return next(err);
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const deleteQuiz = async (req, res, next) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findByIdAndDelete(quizId);
    if (!quiz) {
      const err = new NotFoundError(`There is no Quiz with ID ${quizId}`);
      return next(err);
    }
    res.status(200)
    .json({ success: true, message: `Quiz with ID ${quizId} has been deleted successfully!` });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  getAllQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz
}