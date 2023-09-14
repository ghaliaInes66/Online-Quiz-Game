const Quiz = require('../models/Quiz');

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: userId });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getQuiz = async (req, res) => {
  const quizId = req.params.id;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

const createQuiz = async (req, res) => {
  const quizData = req.body;

  try {
    const newQuiz = new Quiz(quizData);
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

const updateQuiz = async (req, res) => {
  const quizId = req.params.id;
  const updatedQuizData = req.body;

  try {
    const quiz = await Quiz.findByIdAndUpdate(quizId, updatedQuizData, { new: true });
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

const deleteQuiz = async (req, res) => {
  const quizId = req.params.id;

  try {
    const quiz = await Quiz.findByIdAndDelete(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(204).end(); // No content, successful deletion
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz
}