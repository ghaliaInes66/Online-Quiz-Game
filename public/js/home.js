//log out
const logOutBtn=document.getElementById('logOut');

logOutBtn.addEventListener('click' , () =>{
   window.location.href = '/api/v1/auth/logout';
   localStorage.removeItem('id');
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
    location.href = '../pages/duo-game';
})

startcss.addEventListener('click' , () => {
    localStorage.setItem('category','css');
    location.href = '../pages/duo-game';
})

startjs.addEventListener('click' , () => {
    localStorage.setItem('category','js');
    location.href = '../pages/duo-game';
})

startgit.addEventListener('click' , () => {
    localStorage.setItem('category','git');
    location.href = '../pages/duo-game';
})

startc.addEventListener('click' , () => {
    localStorage.setItem('category','c');
    location.href = '../pages/duo-game';
})

startnode.addEventListener('click' , () => {
    localStorage.setItem('category','nodeJs');
    location.href = '../pages/duo-game';
})

startreact.addEventListener('click' , () => {
    localStorage.setItem('category','react');
    location.href = '../pages/duo-game';
})

const id = localStorage.getItem('userId');
console.log(id);