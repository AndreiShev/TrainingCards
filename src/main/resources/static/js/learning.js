import store from './cardsStore.js';

export default class Learning {
    learningDisplay;
    cardsDisplay;
    learningStart;
    learningStop;
    cardWrapper;
    buttonsArea;
    cardsList;

    constructor() {
        this.setCommonElements();
        this.setCommonListeners();
    }

    setCommonElements() {
        this.cardsDisplay = document.querySelector(".content");
        this.learningDisplay = document.querySelector(".learn-display");
        this.learningStop = document.getElementById("stopLearningBtn");
        this.learningStart = document.getElementById("startLearningBtn");
        this.cardWrapper = document.getElementById("cardWrapper");
        this.buttonsArea = document.getElementById("buttonsArea");
    }

    setCommonListeners() {
        this.learningStop.addEventListener('click', this.toggleDisplay);
        this.learningStart.addEventListener('click', this.loadDisplay);
        this.cardWrapper.addEventListener('click', this.flipCard)
    }

    toggleDisplay = event => {
        this.learningDisplay.classList.toggle("open");
        this.cardsDisplay.classList.toggle("open");
    }

    loadDisplay = event => {
        this.loadData();
        this.toggleDisplay();
    }

    flipCard = event => {
        this.cardWrapper.classList.toggle('flipped');
    }

    loadData() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `/api/v1/learning/${store.getState().activeCategoryId}`);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send();

        xhr.onload = () => {
            this.cardsList = JSON.parse(xhr.response);
        }
    }
}