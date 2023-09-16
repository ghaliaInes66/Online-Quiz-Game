
const socket = io();

const startGame = document.getElementById('start-game');
let rightAnswerClicked = false;
let currentGame;
let option;

// const startTimer = (timer) => {
  
//   console.log(timer);
//   timer--;
//   setTimeout(() => startTimer(timer), 1000);
// }

startGame.onclick = () => {
  startGame.style.visibility = 'hidden';
  const searching = document.querySelector('.searching');
  searching.style.visibility = 'visible';
  const userId = localStorage.getItem('id');
  socket.emit('new game', userId, 'Computer Science');
  socket.on('start game', (game) => {
    searching.style.visibility = 'hidden';
    currentGame = game;
    console.log('Game Started');
    socket.on('start round', (quiz, score) => {
      const quizDom = document.querySelector('.quiz');
      const questionDom = document.querySelector('.question');
      questionDom.textContent = quiz.question;
      const options = document.querySelectorAll('.option');
      const yourScore = document.querySelector('.your-score');
      const oponentScore = document.querySelector('.oponent-score');

      for(let i = 0; i < 4; i++) {
        options[i].classList.remove('clicked');
        options[i].classList.remove('correct');
        options[i].classList.remove('incorrect');
      }

      // startTimer(10);

      quizDom.id = quiz._id;
      if(userId === game.firstUser) {
        yourScore.textContent = score.firstUserScore;
        oponentScore.textContent = score.secondUserScore;
      } else {
        yourScore.textContent = score.secondUserScore;
        oponentScore.textContent = score.firstUserScore;
      }

      let i = 0;
      options.forEach(option => {
        option.id = quiz.options[i]._id;
        option.textContent = quiz.options[i].option;
        option.dataset.isCorrect = quiz.options[i].isCorrect;
        option.addEventListener('click', () => {
          console.log(option);
          console.log(option.dataset.isCorrect);
          for(let i = 0; i < 4; i++) {
              option.classList.remove('clicked');
          }
          option.classList.add('clicked');
          // if(!rightAnswerClicked || option.dataset.isCorrect === 'true') {
          //   socket.emit('answer', game._id, option.id);
          // }
          // if(option.dataset.isCorrect === 'true') {
          //   rightAnswerClicked = true;
          // }
        })
        i++;
      });
    });
    socket.on('timer', (timer) => {
      if(timer === 0) {
        let score = 0;
        const userId = localStorage.getItem('id');
        const option = document.querySelector('.clicked');
        let optionId;
        
        if(option) {
          if(option.dataset.isCorrect === 'true') {
            option.classList.add('correct');
            score = 1;
          } else {
            option.classList.add('incorrect');
          }
          optionId = option.id;
        } else {
          optionId = null;
        }
        console.log(score);
        socket.emit('answer', currentGame._id, optionId, score, userId);
      }
      const timerDom = document.querySelector('.timer');
      timerDom.textContent = timer;
    });
    socket.on('game ended', (game) => {
      const timer = document.querySelector('.timer');
      const id = localStorage.getItem('id');
      const yourScore = document.querySelector('.your-score');
      const oponentScore = document.querySelector('.oponent-score');
      let currentUserScore;
      let oponentUserScore;

      if(game.firstUser === id) {
        yourScore.textContent = game.firstUserScore;
        oponentScore.textContent = game.secondUserScore;
        currentUserScore = game.firstUserScore;
        oponentUserScore = game.secondUserScore;
      } else {
        yourScore.textContent = game.secondUserScore;
        oponentScore.textContent = game.firstUserScore;
        currentUserScore = game.secondUserScore;
        oponentUserScore = game.firstUserScore;
      }
      
      if(currentUserScore > oponentUserScore) {
        timer.textContent = 'Win';
      }

      if(currentUserScore === oponentUserScore) {
        timer.textContent = 'Draw';
      }

      if(currentUserScore < oponentUserScore) {
        timer.textContent = 'Loose';
      }

      const backButton = document.querySelector('.back-link');
      backButton.style.visibility = 'visible';
      
    });
  });
  
}

socket.on('connect', () => {
  console.log(`Connected to server`);
})