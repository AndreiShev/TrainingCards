import store from './cardsStore.js';
import learnStore from "./learningStore.js";

export default class Learning {
    learningDisplay;
    cardsDisplay;
    learningStart;
    learningStop;
    cardWrapper;
    buttonsArea;
    cardsRemaining;
    arrQuestionText;
    answerText;
    learningTitle;

    constructor() {
        this.setCommonElements();
        this.setCommonListeners();

        learnStore.subscribe(this.fillCard);
        learnStore.subscribe(this.normalizeDisplay);
    }

    setCommonElements() {
        this.cardsDisplay = document.querySelector(".content");
        this.learningDisplay = document.querySelector(".learn-display");
        this.learningStop = document.getElementById("stopLearningBtn");
        this.learningStart = document.getElementById("startLearningBtn");
        this.cardWrapper = document.getElementById("cardWrapper");
        this.buttonsArea = document.getElementById("buttonsArea");
        this.cardsRemaining = document.getElementById("cardsRemaining");
        this.arrQuestionText = [...document.querySelectorAll(".card-title")];
        this.answerText = document.getElementById("answerText");
        this.learningTitle = document.getElementById("learningTitle");
        this.difficultyButtons = document.getElementById("difficultyButtons");
    }

    setCommonListeners() {
        this.learningStop.addEventListener('click', this.toggleDisplay);
        this.learningStart.addEventListener('click', this.loadDisplay);
        this.cardWrapper.addEventListener('click', this.flipCard);
        this.difficultyButtons.addEventListener('click', this.handleButtonsEvent);
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
        if (learnStore.getCount() > 0) {
            this.cardWrapper.classList.toggle('flipped');
        }
    }

    normalizeDisplay = event => {
        this.cardWrapper.classList.remove('flipped');
    }

    loadData() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `/api/v1/learning/${store.getState().activeCategoryId}`);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send();

        xhr.onload = () => {
            learnStore.init(JSON.parse(xhr.response));
        }
    }

    fillCard = (event) => {
        let card = learnStore.getActiveCard() ? learnStore.getActiveCard() : learnStore.getDefaultCard();
        console.log(card);
        this.learningTitle.innerHTML = `Обучение: ${store.getActiveCategory().name}`;
        this.cardsRemaining.innerHTML = `Осталось карточек: ${learnStore.getCount()}`;
        this.arrQuestionText.forEach((elem) => {
            elem.innerHTML = card.title;
        });

        this.answerText.innerHTML = card.answer;
    }

    handleButtonsEvent = event => {
        event.stopPropagation();
        let actionElement = event.target.closest('[data-action]');
        if (!actionElement) return;

        const action = actionElement.dataset.action;
        this.sendReviewResult(action);

        switch (action) {
            case "repeat":
                learnStore.placeActiveCardInQueue();
                break;
            default:
                learnStore.extractDisplayedCard();
                break;
        }
    }

    sendReviewResult(action) {
        let card =  learnStore.getActiveCard();

        let json = JSON.stringify({
            id: card.id,
            action: action,
        });

        console.log(action);

        let xhr = new XMLHttpRequest();
        xhr.open("PUT", "/api/v1/review/");
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json);
    }
}