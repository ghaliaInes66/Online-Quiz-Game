

// const updates = document.querySelectorAll('.fa-pen-to-square');

// const updateShortcut = (update) => {
//   update.onclick = (e) => {
//     e.preventDefault();
//     const QuestionInput = document.getElementById('url');
//     // const pathnameInput = document.getElementById('pathname');
//     const submit = document.getElementById('submit');
//     const card = e.target.parentElement;
//     const url = card.dataset.question;
//     const pathname = card.dataset.pathname;
//     const token = localStorage.getItem('token');

//     submit.id = 'update';
//     urlInput.value = url;
//     pathnameInput.value = pathname;

//     submit.onclick = (e) => {
//       e.preventDefault();
//       fetch(`${urlEndpoint}api/v1/urls/${card.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body : JSON.stringify({ url: urlInput.value, pathname: pathnameInput.value })
//       })
//       .then(async response => {
//         if(!response.ok) {
//           const err = await response.json();
//           const errorCard = document.querySelector('.error');
//           errorCard.textContent = err.message;
//           errorCard.style.visibility = 'visible';
//           return;
//         }
//         return response.json();
//       })
//       .then(data => {
//         const newShortcut = card.querySelector('p');
//         newShortcut.textContent = `${urlEndpoint}${data.updatedShortcut.pathname}`;
//         submit.id = 'submit';
//         urlInput.value = '';
//         pathnameInput.value = '';
//         console.log(data);
//       })
//       .catch(err => console.error(err));
//     }
//   }
// }

// updates.forEach(update => {
//   updateShortcut(update);
// })

// export default updateShortcut;