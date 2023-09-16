const login = document.getElementById('login');

login.onclick = (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(async response => {
    if(!response.ok) {
      const err = await response.json();
      const errorCard = document.querySelector('.error');
      errorCard.textContent = err.message;
      errorCard.style.visibility = 'visible';
      throw Error(err.message);
    }
    return response.json();
  }).then(data => {
    localStorage.setItem('id', data.user.id);
    console.log(data);
    window.location.href = '/home'
  }).catch(err => {
    console.error(err);
  })
}