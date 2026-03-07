export default class Cards {
    currentCategoryId = "";
    currentCards = [];
    currentCardIndex = 0;
    isLearning = false;
    cardCategories = [];
    modalCard;
    modalCategory;

    constructor(cardCategories) {
        this.cardCategories = cardCategories;
        this.addListenersToCategories();
        this.addListenersToCardsButtons();
    }

    addListenersToCategories() {
        let categoriesList = document.querySelectorAll('.category-item');
        categoriesList.forEach((elem) => {
             elem.addEventListener('click', this.selectCategory);
             elem.querySelector('.btn-close').addEventListener('click', this.deleteCategory);
        });

        let addCategoryButton = document.getElementById('addCategoryButton');
        addCategoryButton.addEventListener('click', this.openAddCategoryForm);
    }

    addListenersToCardsButtons() {
        let addButton = document.getElementById('addCardBtn');
        addButton.addEventListener('click', this.openAddCardForm);
    }

    selectCategory = event => {
        this.currentCategoryId = Number(event.currentTarget.getAttribute('data-category-id'));
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
        const category = this.cardCategories.find(c => c.id === this.currentCategoryId);
        document.getElementById('currentCategory').textContent = category.name;
        this.showCards(this.currentCategoryId);
        document.getElementById('startLearningBtn').style.display = 'inline-flex';
    }

    /* Обработка формы на создание карточки */
    openAddCardForm = event =>  {
        this.buildAddCardModalWindow();
        this.toggleAddCardModelWindow();
    }

    closeAddCardForm = event => {
        this.toggleAddCardModelWindow();
        document.forms.addCardForm.reset();
    }

    handleSubmitAddCardForm = event => {
        event.preventDefault();
        this.submitAddCardForm();
        this.toggleAddCardModelWindow();
        document.forms.addCardForm.reset();
    }

    submitAddCardForm() {
        let formData = new FormData(document.forms.addCardForm);
        let json = JSON.stringify({
            title: formData.get('title'),
            answer: formData.get('answer'),
            category: formData.get('category'),
        });
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/v1/cards/addCard");
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json);

        xhr.onload = () => {
            let newCard = JSON.parse(xhr.response);
            let cardsGrid = document.querySelector('.cards-grid');
            let cardElem = document.createElement('div');
            cardElem.classList.add('card-item');
            cardElem.innerHTML =`<div class="card-question">${newCard.title}</div>
                                 <div class="card-answer">${newCard.answer}</div>
                                 <button class="btn btn-close" data-card-id="${newCard.id}"><img src="/svg/close-circle.svg" alt=""></button>`;
            cardsGrid.prepend(cardElem);
            this.addCardToCategory(newCard);
            this.updateCountCategory(this.currentCategoryId);
            cardElem.querySelector('.btn-close').addEventListener('click', this.handleDeleteCard);
        }
    }

    buildAddCardModalWindow() {
        if (this.modalCard != null) {
            return;
        }

        let sModal = `<div class="modal-window" id="modalWindowAddCard">
                    <div class="modal-window__content">
                        <div class="modal-header">Создание карточки</div>
                        <form class="modal-form" name="addCardForm">
                            <input type="text" name="title" placeholder="Вопрос" required>
                            <input type="text" name="answer" placeholder="Ответ" required>
                            <input type="text" name="category" value="${this.currentCategoryId}">
                            <div class="modal-window_btns">
                                <button type="button" class="modal-form__reset btn-secondary">отменить <img src="/svg/close-square.svg" alt=""></button>
                                <input class="modal-form__submit btn-secondary" type="submit" value="создать" id="requestCardButton">
                            </div>
                        </form>
                    </div>
                </div>`;
        document.body.insertAdjacentHTML('afterend', sModal);
        this.modalCard = document.getElementById('modalWindowAddCard');
        this.addEventListenersAddCardModelWindow();
    }

    toggleAddCardModelWindow() {
        this.modalCard.classList.toggle('open');
    }

    addEventListenersAddCardModelWindow() {
        let reset = this.modalCard.querySelector('.modal-form__reset');
        reset.addEventListener('click', this.closeAddCardForm);
        let submit = this.modalCard.querySelector('.modal-form__submit');
        submit.addEventListener('click', this.handleSubmitAddCardForm);
    }

    removeEventListenersAddCardModelWindow() {
        let reset = this.modalCard.querySelector('.modal-form__reset');
        reset.removeEventListener('click', this.closeAddCardForm);
        let submit = this.modalCard.querySelector('.modal-form__submit');
        submit.removeEventListener('click', this.handleSubmitAddCardForm);
    }

    handleDeleteCard = event => {
        let cardId = Number(event.currentTarget.getAttribute('data-card-id'));

        fetch(`/api/v1/cards/card/${cardId}`, {
            method: 'DELETE',
        }).then(r => {});

        event.currentTarget.removeEventListener('click', this.handleDeleteCard);
        event.currentTarget.parentElement.remove();

        this.deleteCardFromCategory(cardId);
        this.updateCountCategory(this.currentCategoryId);
    }

    /*  END Обработка формы на создание карточки */

    /*  Обработка формы на создание категории */
    openAddCategoryForm = event =>  {
        this.buildAddCategoryModalWindow();
        this.toggleAddCategoryModelWindow();
    }

    closeAddCategoryForm = event => {
        this.toggleAddCategoryModelWindow();
        document.forms.addCategoryForm.reset();
    }

    handleSubmitAddCategoryForm = event => {
        event.preventDefault();
        this.submitAddCategoryForm();
        this.toggleAddCategoryModelWindow();
        document.forms.addCategoryForm.reset();
    }

    submitAddCategoryForm() {
        let formData = new FormData(document.forms.addCategoryForm);
        let json = JSON.stringify({
            name: formData.get('name'),
            description: formData.get('description')
        });
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/v1/cards/addCategory");
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json);

        xhr.onload = () => {
            let newCategory = JSON.parse(xhr.response);
            this.cardCategories.push(newCategory);
            const categoriesList = document.getElementById('categoriesList');
            let li = document.createElement('li');
            li.className = 'category-item';
            li.setAttribute('data-category-id', newCategory.id);
            li.innerHTML = `
                                        <span>${newCategory.name}</span>
                                        <span class="card-count">${newCategory.cardCount}</span>
                                        <button class="btn btn-close"><img src="/svg/close-circle.svg" alt=""></button>
                                    `;
            categoriesList.appendChild(li);
            li.addEventListener('click', this.selectCategory);
            li.querySelector('.btn-close').addEventListener('click', this.deleteCategory);
        }
    }

    deleteCategory = event => {
        let categoryId = event.currentTarget.parentElement.getAttribute('data-category-id');

        fetch(`/api/v1/cards/cardCategory/${categoryId}`, {
            method: 'DELETE',
        }).then(r => {});

        let elem = document.querySelector(`[data-category-id="${categoryId}"]`);
        event.currentTarget.removeEventListener('click', this.deleteCategory);
        elem.removeEventListener('click', this.selectCategory);
        elem.remove();
        let index = this.cardCategories.findIndex(c => c.id === this.currentCategoryId);

        if (index !== -1) {
            this.cardCategories.splice(index, 1);
        }
    }

    buildAddCategoryModalWindow() {
        if (this.modalCard != null) {
            return;
        }

        let sModal = `<div class="modal-window" id="modalWindowAddCategory">
                    <div class="modal-window__content">
                        <div class="modal-header">Создание категории</div>
                        <form class="modal-form" name="addCategoryForm">
                            <input type="text" name="name" placeholder="Наименование категории" required>
                            <input type="text" name="description" placeholder="Описание" required>
                            <div class="modal-window_btns">
                                <button type="button" class="modal-form__reset btn-secondary">отменить <img src="/svg/close-square.svg" alt=""></button>
                                <input class="modal-form__submit btn-secondary" type="submit" value="создать" id="addCategoryButton">
                            </div>
                        </form>
                    </div>
                </div>`;
        document.body.insertAdjacentHTML('afterend', sModal);
        this.modalCategory = document.getElementById('modalWindowAddCategory');
        this.addEventListenersAddCategoryModelWindow();
    }

    toggleAddCategoryModelWindow() {
        this.modalCategory.classList.toggle('open');
    }

    addEventListenersAddCategoryModelWindow() {
        let reset = this.modalCategory.querySelector('.modal-form__reset');
        reset.addEventListener('click', this.closeAddCategoryForm);
        let submit = this.modalCategory.querySelector('.modal-form__submit');
        submit.addEventListener('click', this.handleSubmitAddCategoryForm);
    }

    removeEventListenersAddCategoryModelWindow() {
        let reset = this.modalCategory.querySelector('.modal-form__reset');
        reset.removeEventListener('click', this.closeAddCategoryForm);
        let submit = this.modalCategory.querySelector('.modal-form__submit');
        submit.removeEventListener('click', this.handleSubmitAddCategoryForm);
    }
    /*  END Обработка формы на создание категории */


    showCards(categoryId) {
        const cardsContainer = document.querySelector('.cards-grid');
        const categoryCards = this.cardCategories.find(c => c.id === this.currentCategoryId);
        this.currentCards = categoryCards.cards;

        if (this.currentCards.length === 0) {
            cardsContainer.innerHTML = ``;
            return;
        }

        cardsContainer.innerHTML = `
                                    ${this.currentCards.map(card => `
                                        <div class="card-item">
                                            <div class="card-question">${card.title}</div>
                                            <div class="card-answer">${card.answer}</div>
                                            <button class="btn btn-close" data-card-id="${card.id}"><img src="/svg/close-circle.svg" alt=""></button>
                                        </div>
                                    `).join('')}
                            `;
        let deleteBtns = [...cardsContainer.querySelectorAll('.btn-close')];
        deleteBtns.forEach((elem) => {
            elem.addEventListener('click', this.handleDeleteCard);
        });
    }

    startLearning() {
        if (currentCards.length === 0) {
            alert('В этой категории нет карточек для обучения!');
            return;
        }

        this.isLearning = true;
        this.currentCardIndex = 0;
        document.getElementById('cardsListView').style.display = 'none';
        document.getElementById('learningView').style.display = 'block';

        this.showCurrentCard();
    }

    showCurrentCard() {
        const card = currentCards[currentCardIndex];
        document.getElementById('cardQuestion').textContent = card.question;
        document.getElementById('cardAnswer').textContent = card.answer;
        document.getElementById('currentCardNumber').textContent = currentCardIndex + 1;
        document.getElementById('totalCards').textContent = currentCards.length;
        document.getElementById('cardContainer').classList.remove('card-flipped');
    }

    flipCard() {
        document.getElementById('cardContainer').classList.toggle('card-flipped');
    }

    nextCard() {
        if (currentCardIndex < currentCards.length - 1) {
            currentCardIndex++;
            this.showCurrentCard();
        } else {
            alert('🎉 Поздравляем! Вы завершили изучение этой категории!');
            this.backToCards();
        }
    }

    prevCard() {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            this.showCurrentCard();
        }
    }

    backToCards() {
        this.isLearning = false;
        document.getElementById('learningView').style.display = 'none';
        document.getElementById('cardsListView').style.display = 'block';
    }

    renderModalWindow() {
        return `<div class="modal-window">
                    <div class="modal-window__content">
                        <div class="modal-header">Создание категории</div>
                        <form class="modal-form" name="addCategoryForm">
                            <input type="text" name="name" placeholder="Наименование категории" required>
                            <input type="text" name="description" placeholder="Описание" required>
                            <input type="submit" value="создать" id="addCategoryButton">
                        </form>
                    </div>
                </div>`;
    }

    deleteCardFromCategory(cardId) {
        const category = this.cardCategories.find(category => category.id === this.currentCategoryId);
        if (category) {
            const cardIndex = category.cards.findIndex(card => card.id === cardId);
            if (cardIndex !== -1) {
                category.cards.splice(cardIndex, 1);
                category.cardCount = category.cards.length;
            }
        }
    }

    addCardToCategory(card) {
        const category = this.cardCategories.find(category => category.id === this.currentCategoryId);
        if (category) {
            category['cards'].push(card);
            category.cardCount += 1;
        }
    }

    updateCountCategory(categoryId) {
        const category = this.cardCategories.find(category => category.id === categoryId);
        let categoryElem = document.querySelector(`[data-category-id="${this.currentCategoryId}"]`);
        categoryElem.querySelector('.card-count').innerHTML = category.cardCount;
    }
}