const DuoGame = require("../models/DuoGame");
const Quiz = require("../models/Quiz");
const startRound = require('../services/gameRound');

let playersWaiting = [];

const startDuoGame = (socket) => {
  socket.on('new game', async (userId, category) => {
    if(playersWaiting.length > 0) {
      const user = playersWaiting.shift();
      // Get 5 Random Quizzes
      const randomQuizzes = await Quiz.aggregate([{ $sample: { size: 5 } }]);
      let quizzes = [];
      for(let i = 0; i < 5; i++) {
        quizzes.push({ quizId: randomQuizzes[i]._id });
      }
      console.log(quizzes);
      
      // Create Game
      const game = new DuoGame({
        firstUser: userId,
        secondUser: user.userId,
        category,
        quizzes: quizzes
      })
      await game.save();

      socket.emit('start game', game);
      user.socket.emit('start game', game);
      const timer = 30;
      const numberOfRounds = 5;
      await startRound(user, socket, quizzes, timer, numberOfRounds);
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