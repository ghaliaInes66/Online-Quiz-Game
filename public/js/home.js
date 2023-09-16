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

const id = localStorage.getItem('userId');
console.log(id);