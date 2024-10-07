const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const resetBtn = document.querySelector('.btn-reset');
const pauseBtn = document.querySelector('.btn-pause');
const session = document.querySelector('.minutes');
const secondDiv = document.querySelector('.seconds')
let myInterval;
let state  = true;
let isPaused = false;
let totalSeconds;

const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent);

    if(state || isPaused) {
        state = false;
        isPaused = false;
        if (!totalSeconds) {
            totalSeconds = sessionAmount * 60;
        }

        const updateSeconds = () => {
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');

            if (!isPaused) {
                totalSeconds--;
            }

            let minutesLeft = Math.floor(totalSeconds / 60);
            let secondsLeft = totalSeconds % 60;

            if(secondsLeft < 10) {
                secondDiv.textContent = '0' + secondsLeft;
            } else {
                secondDiv.textContent = secondsLeft;
            }
            minuteDiv.textContent = minutesLeft

            if(minutesLeft === 0 && secondsLeft === 0) {
                bells.play()
                clearInterval(myInterval);
            }
        }
        myInterval = setInterval(updateSeconds, 1000);
    } else {
        alert('Session has already started.')
    }
}

const pauseTimer = () => {
    if (myInterval) {
        clearInterval(myInterval);
        isPaused = true;
    }
};

const resetTimer = () => {
    clearInterval(myInterval)
    state = true;
    isPaused = false;
    bells.pause();
    bells.currentTime = 0;
    session.textContent = '25';
    secondDiv.textContent = '00';
    totalSeconds = 25 * 60;
};

startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);