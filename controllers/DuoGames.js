const DuoGame = require("../models/DuoGame");
const Quiz = require("../models/Quiz");


let playersWaiting = [];
const quiz = {
  category: 'Computer Science',
  question: 'what is the name of the heighest bulding in the world?',
  options: [
    {
      option: 'Eivel Tower',
      isCorrect : false
    },
    {
      option:'Eivel Tower',
      isCorrect: false
    },
    {
      option:'Eivel Tower',
      isCorrect: false
    },
    {
      option:'khalifa Tower',
      isCorrect: true
    }
  ]
}

const setTimer = (user, socket, timer, resolve) => {
  if(timer < 0) {
    return resolve();
  }
  socket.emit('timer', timer);
  user.socket.emit('timer', timer);
  console.log(timer);
  timer--;
  setTimeout(() => setTimer(user, socket, timer, resolve), 1000);
}

const startRound = async (user, socket, timer, numberOfRounds) => {
  if(numberOfRounds < 1) {
    return;
  }
  socket.emit('start round', quiz);
  user.socket.emit('start round', quiz);
  try {
    await new Promise((resolve) => {
      setTimer(user, socket, timer, resolve);
    })
    
    timer = 30;
    await startRound(user, socket, timer, --numberOfRounds);
  } catch (err) {
    console.error(err);
  }
}

const startDuoGame = (socket) => {
  socket.on('new game', async (userId) => {
    if(playersWaiting.length > 0) {
      const user = playersWaiting.shift();
      // // Get 5 Random Quizzes
      // const quizzes = await Quiz.aggregate([{ $sample: { size: 5 } }]);
      // const quizzesId = quizzes.map(quiz => quiz._id);
      // console.log(quizzes);
      
      // // Create Game
      // const game = new DuoGame({
      //   firstUser: userId,
      //   secondUser: user.userId,
      //   firstUserScore: userId,
      //   secondUserScore: user.userId,
      //   quizzes: quizzesId
      // })
      // await game.save();
      
      socket.emit('start game');
      user.socket.emit('start game');
      const timer = 30;
      const numberOfRounds = 5;
      await startRound(user, socket, timer, numberOfRounds);
    }
    playersWaiting.push({ userId, socket });
  })
}

const endDuoGame = (socket) => {
  
}

module.exports = {
  startDuoGame,
  endDuoGame
}