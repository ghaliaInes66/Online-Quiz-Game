const username=document.getElementById('username');
const email=document.getElementById('email');
const password=document.getElementById('password');
const passwordConfi=document.getElementById('password-confi');
const signUpBtn=document.getElementById('signUp');
const emailError=document.querySelector('.email-error');
const pswError=document.querySelector('.password-error');
const pswConfiError=document.querySelector('.password-confi-error');

signUpBtn.addEventListener('click', (e) => {
    let  valid=/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if(!email.value.match( valid) ||email.value==''){
        emailError.textContent='Valid email required';
        return;
    }else emailError.textContent=''

    if(password.value.length < 6){
        pswError.textContent='Your Password Is Less Than 6 Carchtere, Valid password required';
        return;
    }else pswError.textContent=''

    if(password.value!='' && passwordConfi.value!='' && passwordConfi.value!==password.value){
        pswConfiError.textContent='The password is incorrect';
        return;
    }else pswConfiError.textContent=''

    e.preventDefault();

    const newUser = {
        'userName': username.value,
        'email': email.value,
        'password': password.value
       }
  
       console.log(newUser.userName);
       console.log(newUser.email);
       console.log(newUser.password);
  
    fetch('/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newUser })
    }).then(response => {
      if(!response.ok) {
        throw Error('Can Not Register!');
      }
      return response.json();
    }).then(data => {
      localStorage.setItem('id', data.user.id);
      console.log(data);
    }).catch(err => {
      console.error(err);
    })
    
})