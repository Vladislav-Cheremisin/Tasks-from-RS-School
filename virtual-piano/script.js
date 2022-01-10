// Make correct animations for piano buttons. Add sound event on mouseover.

const piano = document.querySelector(`.piano`);
const pianoKeys = document.querySelectorAll(`.piano-key`);
const makeButtonActive = event => {
    event.target.classList.add(`piano-key-active`);
    const audioFileOnMouseEvent = document.querySelector(`audio[data-letter=${event.target.getAttribute(`data-letter`)}`);
    audioFileOnMouseEvent.currentTime = 0;
    audioFileOnMouseEvent.play();
};
const makeButtonInactive = event => {event.target.classList.remove(`piano-key-active`)};
const mouseDown = event => {
    if (event.target.classList.contains(`piano-key`)) {
        event.target.classList.add(`piano-key-active`);
        const audioFileOnMouseEvent = document.querySelector(`audio[data-letter=${event.target.getAttribute(`data-letter`)}`);
        audioFileOnMouseEvent.currentTime = 0;
        audioFileOnMouseEvent.play();
    }
    pianoKeys.forEach(element => {
        element.addEventListener(`mouseover`, makeButtonActive);
        element.addEventListener(`mouseout`, makeButtonInactive);
    })
}
const mouseUp = () => {
    pianoKeys.forEach(element => {
        element.classList.remove(`piano-key-active`);
        element.removeEventListener(`mouseover`, makeButtonActive);
        element.removeEventListener(`mouseout`, makeButtonInactive);
    })
}
piano.addEventListener(`mousedown`, mouseDown, false);
window.addEventListener(`mouseup`,mouseUp);

// Make correct Notes - Letter change

const btnContainer = document.querySelector(`.btn-container`);
const dataButtons = document.querySelectorAll(`.btn`);
btnContainer.addEventListener(`click`, (event) => {
    if (event.target.classList.contains(`btn-active`) || event.target.classList.contains(`btn-container`)) {
        return false;
    } else {
        if (event.target.classList.contains(`btn-letters`)) {
            pianoKeys.forEach(element => {element.classList.add(`letter`)})
        } else {
            pianoKeys.forEach(element => {element.classList.remove(`letter`);})
        }
        dataButtons.forEach(button => {
            button.classList.remove(`btn-active`);
            event.target.classList.add(`btn-active`);
        })
    }
})

// Make Fullscreen button work

const fullScreenButton = document.querySelector(`.fullscreen`);
const activateFullScreen = element => {
    if(element.requestFullscreen) {element.requestFullscreen();}
    else if (element.mozRequestFullScreen) {element.mozRequestFullScreen();}
    else if (element.webkitRequestFullscreen) {element.webkitRequestFullscreen();}
    else if(element.msRequestFullscreen) {element.msRequestFullscreen();}
  };
const deactivateFullScreen = () => {
    if(document.exitFullscreen) {document.exitFullscreen();}
    else if (document.mozCancelFullScreen) {document.mozCancelFullScreen();}
    else if (document.webkitExitFullscreen) {document.webkitExitFullscreen();}
  };
fullScreenButton.addEventListener(`click`, event => {
    if(document.fullscreenElement === null && event.target.classList.contains(`openfullscreen`) === false) {
        event.target.classList.add(`openfullscreen`);
    }
    if(event.target.classList.contains(`openfullscreen`)) {
        event.target.classList.remove(`openfullscreen`);
        activateFullScreen(document.body);
    } else {
        event.target.classList.add(`openfullscreen`);
        deactivateFullScreen();
    }
})

// Add sounds for the piano (on keyboard press)

window.addEventListener(`keydown`, event => {
    const audioFile = document.querySelector(`audio[data-letter=${event.code[3]}]`);
    const keyFile = document.querySelector(`.piano-key[data-letter=${event.code[3]}]`);
    if (!audioFile || keyFile.classList.contains(`piano-key-active`)) {return;}
    else {
        audioFile.currentTime = 0;
        audioFile.play();
        keyFile.classList.add(`piano-key-active`);
    }
})
window.addEventListener(`keyup`, event => {
    const audioFile = document.querySelector(`audio[data-letter=${event.code[3]}]`);
    const keyFile = document.querySelector(`.piano-key[data-letter=${event.code[3]}]`)
    if (!audioFile) {return;}
    else {
        keyFile.classList.remove(`piano-key-active`);
    }
})