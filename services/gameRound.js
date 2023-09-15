const DuoGame = require('../models/DuoGame');
const Quiz = require('../models/Quiz');

let id;
let game = {
  firstUserScore: 0,
  secondUserScore: 0
};

const setTimer = async (user, socket, timer, resolve) => {
  if(timer < 0) {
    console.log(game.firstUserScore);
    await DuoGame.findByIdAndUpdate(id, { $set: game }, { new: true });
    return resolve();
  }
  socket.emit('timer', timer);
  user.socket.emit('timer', timer);
  
  timer--;
  setTimeout(() => setTimer(user, socket, timer, resolve), 1000);
}

const startRound = async (user, socket, quizzesId, timer, numberOfRounds) => {
  if(numberOfRounds < 1) {
    return;
  }
  // Get Quizzes
  const quiz = await Quiz.findOne({ _id: quizzesId[numberOfRounds-1].quizId });
  console.log(quiz);
  socket.emit('start round', quiz, game.firstUserScore);
  user.socket.emit('start round', quiz, game.secondUserScore);
  socket.on('answer', (gameId, optionId) => {
    console.log(gameId);
    id = gameId;
    // console.log()
    const rightOption = quiz.options.find(option => option._id === optionId);
    console.log(rightOption);
    if(rightOption) {
      game.firstUserScore++;
      game.secondUserScore++;
    }
    
    console.log('answer' + game.firstUserScore)
    console.log(optionId);
  });
  try {
    await new Promise((resolve) => {
      setTimer(user, socket, timer, resolve);
    })

    timer = 30;
    setTimeout(async () => await startRound(user, socket, quizzesId, timer, --numberOfRounds), 5000);
  } catch (err) {
    console.error(err);
  }
}

module.exports = startRound