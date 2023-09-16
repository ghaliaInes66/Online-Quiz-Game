const DuoGame = require('../models/DuoGame');
const Quiz = require('../models/Quiz');

let id;
let game = {
  firstUserScore: 0,
  secondUserScore: 0
};
let firstUserScore = 0;
let secondUserScore = 0;


const setTimer = async (user, socket, timer, resolve) => {
  if(timer < 0) {
    console.log(game.firstUserScore);
    await DuoGame.findByIdAndUpdate(id, { $inc: { 
      firstUserScore: game.firstUserScore, 
      secondUserScore: game.secondUserScore 
    } }, { new: true });
    return resolve();
  }
  socket.emit('timer', timer);
  user.socket.emit('timer', timer);
  
  timer--;
  setTimeout(() => setTimer(user, socket, timer, resolve), 1000);
}

const endDuoGame = async (user, socket, game) => {
  try {
    console.log('Game Id = ', game._id)
    const gameResult = await DuoGame.findById(game._id);
    console.log(gameResult);
    socket.emit('game ended', gameResult);
    user.socket.emit('game ended', gameResult);
    // firstUserScore = 0;
    // firstUserScore = 0;
    console.log('end of game');
  } catch (error) {
    console.error(error);
  }
}

const startRound = async (user, socket, quizzesId, timer, numberOfRounds, currentGame) => {
  if(numberOfRounds < 1) {
    endDuoGame(user, socket, currentGame);
    firstUserScore = 0;
    secondUserScore = 0;
    return;
  }
  // Get Quizzes
  const quiz = await Quiz.findOne({ _id: quizzesId[numberOfRounds-1].quizId });
  console.log(quiz);
  firstUserScore += game.firstUserScore;
  secondUserScore += game.secondUserScore;
  socket.emit('start round', quiz, { firstUserScore, secondUserScore });
  user.socket.emit('start round', quiz, { firstUserScore, secondUserScore });
  socket.on('answer', (gameId, optionId, score, userId) => {
    id = gameId;
    // console.log(currentGame.firstUser + ' = ' + userId)
    // console.log(typeof currentGame.firstUser);
    const firstUser = currentGame.firstUser.toString();
    const secondUser = currentGame.secondUser.toString();
    console.log(firstUser);
    console.log('firstUser = ' + firstUser);
    console.log('userId = ' + userId);
    // if(firstUser === userId) {
    //   console.log('score = ', score)
    //   game.secondUserScore = score;
    // } 

    console.log('secondUser = ' + secondUser);
    console.log('userId = ' + userId);
    // if(secondUser === userId) {
    //   console.log('score = ', score)
    //   game.firstUserScore = score;
    // }
    game.firstUserScore = score;
    // console.log(userId)
    
    console.log('firstUserScore = ' + game.firstUserScore)
    console.log('secondUserScore = ' + game.secondUserScore)
    // console.log(optionId);
  });
  user.socket.on('answer', (gameId, optionId, score, userId) => {
    id = gameId;
    // console.log(currentGame.firstUser + ' = ' + userId)
    // console.log(typeof currentGame.firstUser);
    const firstUser = currentGame.firstUser.toString();
    const secondUser = currentGame.secondUser.toString();
    console.log(firstUser);
    console.log('firstUser = ' + firstUser);
    console.log('userId = ' + userId);
    // if(firstUser === userId) {
    //   console.log('score = ', score)
    //   game.secondUserScore = score;
    // } 

    console.log('secondUser = ' + secondUser);
    console.log('userId = ' + userId);
    // if(secondUser === userId) {
    //   console.log('score = ', score)
    //   game.firstUserScore = score;
    // }
    game.secondUserScore = score;
    // console.log(userId)
    
    console.log('firstUserScore = ' + game.firstUserScore)
    console.log('secondUserScore = ' + game.secondUserScore)
    // console.log(optionId);
  });
  try {
    await new Promise((resolve) => {
      setTimer(user, socket, timer, resolve);
    })

    timer = 10;
    setTimeout(async () => await startRound(user, socket, quizzesId, timer, --numberOfRounds, currentGame), 2000);
  } catch (err) {
    console.error(err);
  }
}

module.exports = startRound