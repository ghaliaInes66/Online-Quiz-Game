const timer=document.querySelector('span');

let countdown=30;

function updateCountdown() {
    timer.textContent = countdown;
    countdown--;

    if(countdown<0) {
        timer.textContent = '00';
        clearInterval(interval);
    }
}

updateCountdown();

const interval = setInterval(updateCountdown, 1000);