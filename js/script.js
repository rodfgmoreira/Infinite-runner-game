const character = document.querySelector('.character');
const box = document.querySelector('.boxA');
const gameoverTitle = document.querySelector('.gameover-title')
const restartBtn = document.querySelector('.restartBtn')
const clouds = document.querySelector('.clouds')
const scoreElement = document.querySelector('.score-points')
const highScoreElement = document.querySelector('.score-high')

let currentScore = 0;
let bestScore = localStorage.getItem('highScore') || 0;
let gameRunning = true;

// Show saved Highscore when start
highScoreElement.innerText = bestScore;

// Score function
const scoreMeter = () => {
    if (gameRunning) {
        currentScore++;
        scoreElement.innerText = currentScore;
    }
}

const scoreLoop = setInterval(scoreMeter, 100);

const jump = () => {
    character.classList.add('jump');

    setTimeout(() => {
        character.classList.remove('jump');
    }, 525);
}

const restart = () => {
    window.location.reload()
}

const loop = setInterval(() => {
    const boxPosition = box.offsetLeft;
    const cloudsPosition = clouds.offsetLeft;
    const characterPosition = +window.getComputedStyle(character).bottom.replace('px', '');

    if (boxPosition <= 120 && boxPosition > 0 && characterPosition < 110) {
        gameRunning = false;
        if (currentScore > bestScore) {
            bestScore = currentScore;
            localStorage.setItem('highScore', bestScore);
            highScoreElement.innerText = bestScore;
        }

        // Animations
        box.style.animation = 'none';
        box.style.left = `${boxPosition}px`

        clouds.style.animation = 'none';
        clouds.style.left = `${cloudsPosition}px`

        character.style.animation = 'none';
        character.style.bottom = `${characterPosition}px`;

        character.src = './images/game-over.png';
        character.style.width = '75px';
        character.style.marginLeft = '50px';

        gameoverTitle.style.opacity = '100';
        restartBtn.style.opacity = '100';

        clearInterval(loop);
        clearInterval(scoreLoop);
    }

}, 10);

document.addEventListener('keydown', jump);