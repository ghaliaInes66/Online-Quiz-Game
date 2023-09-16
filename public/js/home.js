//log out
const logOutBtn=document.getElementById('logOut');

logOutBtn.addEventListener('click' , () =>{
   window.location.href = '/';
})

//start
const starthtml=document.querySelector('.start-html');
const startcss=document.querySelector('.start-css');
const startjs=document.querySelector('.start-js');
const startgit=document.querySelector('.start-git');
const startc=document.querySelector('.start-c');
const startnode=document.querySelector('.start-nodeJs');
const startreact=document.querySelector('.start-react');

starthtml.addEventListener('click' , () => {
    localStorage.setItem('category','html');
})

startcss.addEventListener('click' , () => {
    localStorage.setItem('category','css');
})

startjs.addEventListener('click' , () => {
    localStorage.setItem('category','js');
})

startgit.addEventListener('click' , () => {
    localStorage.setItem('category','git');
})

startc.addEventListener('click' , () => {
    localStorage.setItem('category','c');
})

startnode.addEventListener('click' , () => {
    localStorage.setItem('category','nodeJs');
})

startreact.addEventListener('click' , () => {
    localStorage.setItem('category','react');
})

//get user info
const id = localStorage.getItem('id');  
const username=document.getElementById('username');
const email=document.getElementById('email');

fetch(`https://url-shortener-mugw.onrender.com/api/v1/users/${id}`)
.then(res => res.json())
.then(result => {
    username.textContent=result.userName;
    email.textContent=result.email;
})
.catch(err => console.log(err.message));