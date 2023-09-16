// import { urlEndpoint } from '../config.js';
// import updatedShortcut from "./updateShortcut.js";
// import deleteShortcut from "./deleteShortcut.js";
// import copyShortcut from "./copyShortcut.js";

const submit = document.getElementById('submit');

const shortcutCard = ({ _id: id, question, options }) => {
  const card = document.createElement('div');
  card.classList.add("shortcut");
  card.id = id;
  card.dataset.question = question;
  let i = 0;
  options.forEach(option => {
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
  // const trash = card.querySelector('.fa-trash');
  // updatedShortcut(update);
  // deleteShortcut(trash);
  return card;
}

submit.onclick = (e) => {
  e.preventDefault();
  const category = document.getElementById('category');
  let question = document.getElementById('question');
  let correctOption = document.querySelector('.correct-option');
  let incorrectOptions = document.querySelectorAll('.incorrect-option');

  fetch(`/api/v1/quizzes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category: category.value, question: question.value, options: [
      {
        option: correctOption.value,
        isCorrect: true
      },
      {
        option: incorrectOptions[0].value,
        isCorrect: false
      },
      {
        option: incorrectOptions[1].value,
        isCorrect: false
      },
      {
        option: incorrectOptions[2].value,
        isCorrect: false
      }
    ]})
  })
  .then(async response => {
    if(!response.ok) {
      const err = await response.json();
      const errorCard = document.querySelector('.error');
      errorCard.textContent = err.message;
      errorCard.style.visibility = 'visible';
      throw Error('Cannot Create Quiz');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    const shortcutsContainer = document.querySelector('.shortcuts-container');
    shortcutsContainer.prepend(shortcutCard(data.quiz));
    question.value = '';
    correctOption.value = '';
    incorrectOptions.forEach(incorrectOption => {
      incorrectOption.value = '';
    });
  })
  .catch(err => console.error(err));
}