const { 
  getAllQuizzes, 
  getQuiz, 
  createQuiz, 
  deleteQuiz, 
  updateQuiz 
} = require('../controllers/quizes');
const router = require('express').Router();

router.route('/').get(getAllQuizzes).post(createQuiz);
router.route('/:id').get(getQuiz).put(updateQuiz).delete(deleteQuiz);

module.exports = router