
const socket = io();

const startGame = document.getElementById('start-game');

startGame.onclick = () => {
  const userId = localStorage.getItem('id');
  socket.emit('new game', userId);
  socket.on('start game', () => {
    console.log('Game Started');
  });
  socket.on('start round', (quiz) => {
    const quizDom = document.querySelector('.quiz');
    const questionDom = document.querySelector('.question');
    questionDom.textContent = quiz.question;
    
    for(let i = 0; i < 4; i++) {
      const option = document.createElement('div');
      option.className = 'option';
      option.textContent = quiz.options[i].option;
      quizDom.append(option);
    }
  });
  socket.on('timer', (timer) => {
    const timerDom = document.querySelector('.timer');
    timerDom.textContent = timer;
  });
}

socket.on('connect', () => {
  console.log(`Connected to server`);
})