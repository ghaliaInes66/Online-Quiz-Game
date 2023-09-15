
const socket = io();

const startGame = document.getElementById('start-game');
let rightAnswerClicked = false;

startGame.onclick = () => {
  const userId = localStorage.getItem('id');
  socket.emit('new game', userId, 'Computer Science');
  socket.on('start game', (game) => {
    console.log('Game Started');
    socket.on('start round', (quiz) => {
      const quizDom = document.querySelector('.quiz');
      const questionDom = document.querySelector('.question');
      questionDom.textContent = quiz.question;
      const options = document.querySelectorAll('.option');
      const yourScore = document.querySelector('.your-score');
      const oponentScore = document.querySelector('.oponent-score');
      quizDom.id = quiz._id;
      console.log(game)
      yourScore.textContent = game.firstUserScore;
      oponentScore.textContent = game.secondUserScore;
      let i = 0;
      options.forEach(option => {
        option.id = quiz.options[i]._id;
        option.textContent = quiz.options[i].option;
        option.dataset.isCorrect = quiz.options[i].isCorrect;
        option.addEventListener('click', () => {
          console.log(option);
          console.log(option.dataset.isCorrect);
          if(!rightAnswerClicked) {
            socket.emit('answer', game._id, option.id);
          }
          if(option.dataset.isCorrect === 'true') {
            rightAnswerClicked = true;
          }
        })
        i++;
      });
    });
    socket.on('timer', (timer) => {
      const timerDom = document.querySelector('.timer');
      timerDom.textContent = timer;
    });
  });
  
}

socket.on('connect', () => {
  console.log(`Connected to server`);
})