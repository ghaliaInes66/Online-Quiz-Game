// import updatedShortcut from "./updateQuiz.js";
import deleteShortcut from "./removeQuiz.js";


const shortcutCard = ({ _id: id, question, options }) => {
  const card = document.createElement('div');
  card.classList.add("shortcut");
  card.id = id;
  card.dataset.question = question;
  let i = 0;
  options.forEach(option => {
    console.log(option);
    if(option.isCorrect = true) {
      card.dataset[`correct`] = option.option;
    } else {
      card.dataset[`incorrect`] = option.option;
    }
    i++;
  })
  
  card.innerHTML = `
    <p>${question}</p>
    <i class="fa-regular fa-pen-to-square"></i>
    <i class="fa-solid fa-trash"></i>`;
  // const update = card.querySelector('.fa-pen-to-square');
  const trash = card.querySelector('.fa-trash');
  // updatedShortcut(update);
  deleteShortcut(trash);
  return card;
}

fetch(`/api/v1/quizzes`)
.then(async response => {
  if(!response.ok) {
    const err = await response.json();
    const errorCard = document.querySelector('.error');
    errorCard.textContent = err.message;
    errorCard.style.visibility = 'visible';
    throw Error('Cannot Get Quizzes');
  }
  return response.json();
})
.then(data => {
  const shortcutsContainer = document.querySelector('.shortcuts-container');
  data.quizzes.forEach(quiz => {
    shortcutsContainer.prepend(shortcutCard(quiz));
  });
})
.catch(err => console.error(err));