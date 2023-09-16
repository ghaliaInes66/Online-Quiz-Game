const register = document.getElementById('signUp');

register.onclick = (e) => {
  console.log(register);
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('/api/v1/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  }).then(response => {
    if(!response.ok) {
      throw Error('Can Not Register!');
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