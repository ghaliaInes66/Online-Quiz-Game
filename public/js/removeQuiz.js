

const trashes = document.querySelectorAll('.fa-trash');

const deleteShortcut = (trash) => {
  trash.onclick = (e) => {
    e.preventDefault();
    const card = e.target.parentElement;
  
    fetch(`/api/v1/quizzes/${card.id}`, {
      method: 'DELETE'
    })
    .then(async response => {
      if(!response.ok) {
        const err = await response.json();
        const errorCard = document.querySelector('.error');
        errorCard.textContent = err.message;
        errorCard.style.visibility = 'visible';
        throw Error('Cannot Delete Quiz');
      }
      return response.json();
    })
    .then(data => {
      card.remove();
    })
    .catch(err => console.error(err));
  }
}

trashes.forEach(trash => {
  deleteShortcut(trash);
})

export default deleteShortcut;