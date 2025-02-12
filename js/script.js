const character = document.querySelector('.character');

const jump = () => {
    character.classList.add('jump');

    setTimeout(() => {
        character.classList.remove('jump');
    }, 525);
}

document.addEventListener('keydown', jump);