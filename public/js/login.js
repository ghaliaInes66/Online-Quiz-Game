const email=document.getElementById('email');
const password=document.getElementById('password');
const LoginBtn=document.getElementById('login');
const emailError=document.querySelector('.email-error');
const pswError=document.querySelector('.password-error');

LoginBtn.addEventListener('click', (e) => {
    let  valid=/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if(!email.value.match( valid) ||email.value==''){
        emailError.textContent='Valid email required';
        return;
    }else emailError.textContent=''

    if(password.value.length < 6){
        pswError.textContent='Valid password required';
        return;
    }else pswError.textContent=''
   
    
    e.preventDefault();
    const User = {
        'email': email.value,
        'password': password.value
       }

       console.log(User.email);
       console.log(User.password);

  fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ User })
  }).then(response => {
    return response.json();
  }).then(data => {
    localStorage.setItem('id', data.user.id);
    console.log(data);
  }).catch(err => {
    console.error(err);
  })
})
