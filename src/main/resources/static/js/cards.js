import CategoryForm from './forms/categoryForm.js';
import CardForm from './forms/cardForm.js';

export default class Cards {
    currentCategoryId = "";
    currentCards = [];
    cardCategories = [];
    categoryForm;
    cardForm;

    constructor(cardCategories) {
        this.cardCategories = cardCategories;
        this.addListenersToCategories();
        this.addListenersToCards();

        this.categoryForm = new CategoryForm(this);
        this.categoryForm.setCallbacks({
            onSuccess: (action, data) => {
                if (action === 'create') {
                    this.handleCategoryCreated(data);
                } else if (action === 'update') {
                    this.handleCategoryUpdated(data);
                }
            },
            onError: (error) => {
                console.error(error);
                alert(error);
            }
        });

        this.cardForm = new CardForm(this);
        this.cardForm.setCallbacks({
            onSuccess: (action, data) => {
                if (action === 'create') {
                    this.handleCardCreated(data);
                } else if (action === 'update') {
                    this.handleCardUpdated(data);
                }
            },
            onError: (error) => {
                console.error(error);
                alert(error);
            }
        });
    }

    /* Обработка формы на создание карточки */
    addListenersToCards() {
        let addButton = document.getElementById('addCardBtn');
        addButton.addEventListener('click', this.handleAddCardEvent);

        const cardsContainer = document.querySelector('.cards-grid');
        cardsContainer.addEventListener('click', this.handleCardsEvent);
    }

    handleCardsEvent = event => {
        let actionElement = event.target.closest('[data-action]');
        if (!actionElement) return;
        const action = actionElement.dataset.action;

        switch (action) {
            case "delete":
                this.handleDeleteCard(event);
                break;
            case 'change':
                this.handleChangeCard(event);
                break;
        }
    }

    handleAddCardEvent = event => {
        this.cardForm.openForCreate();
    }

    handleDeleteCard(event) {
        let elem = event.target.closest('[data-card-id]');
        let cardId = Number(elem.getAttribute('data-card-id'));

        fetch(`/api/v1/cards/card/${cardId}`, {
            method: 'DELETE',
        }).then(r => {});

        elem.remove();
        this.deleteCardFromCategory(cardId);
        this.updateCountCategory(this.currentCategoryId);
    }

    handleChangeCard(event) {
        let cardElem = event.target.closest('[data-card-id]');
        let cardId = Number(cardElem.getAttribute('data-card-id'));
        let cardObj = this.findCard(this.findCategory(this.currentCategoryId), cardId);
        this.cardForm.openForUpdate(cardObj);
    }

    handleCardCreated (newCard) {
        let cardsGrid = document.querySelector('.cards-grid');
        let cardElem = document.createElement('div');
        cardElem.classList.add('card-item');
        cardElem.classList.add('flashcard');
        cardElem.setAttribute('data-card-id', newCard.id);
        cardElem.innerHTML =`
                                <div class="flashcard-face">
                                    <div class="flashcard-actions">
                                        <button class="btn-card-action btn-edit" data-action="change" title="Редактировать">
                                            <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                                                <path d="m15 5 4 4"></path>
                                            </svg>
                                        </button>
                                        <button class="btn-card-action btn-delete btn-close" data-action="delete" title="Удалить">
                                            <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="card-question">${newCard.title}</div>
                                    <div class="card-answer">${newCard.answer}</div>
                                </div>`;
        cardsGrid.prepend(cardElem);
        this.addCardToCategory(newCard);
        this.updateCountCategory(this.currentCategoryId);
    }

    handleCardUpdated(card) {
        const cardsContainer = document.querySelector('.cards-grid');
        let elem = cardsContainer.querySelector(`[data-card-id="${card.id}"]`);
        elem.querySelector('.card-question').innerHTML = card["title"];
        elem.querySelector('.card-answer').innerHTML = card["answer"];

        let cardObj = this.findCard(this.findCategory(this.currentCategoryId), card.id);
        cardObj["question"] = card["title"];
        cardObj["answer"] = card["answer"];
    }

    showCards() {
        const cardsContainer = document.querySelector('.cards-grid');
        const categoryCards = this.cardCategories.find(c => c.id === this.currentCategoryId);
        this.currentCards = categoryCards["cards"];

        if (this.currentCards.length === 0) {
            cardsContainer.innerHTML = ``;
            return;
        }

        cardsContainer.innerHTML = `
                                    ${this.currentCards.map(card => `
                                        <div class="card-item flashcard" data-card-id="${card.id}">
                                            <div class="flashcard-face">
                                                <div class="flashcard-actions">
                                                    <button class="btn-card-action btn-edit" data-action="change" title="Редактировать">
                                                        <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                                                            <path d="m15 5 4 4"></path>
                                                        </svg>
                                                    </button>
                                                    <button class="btn-card-action btn-delete btn-close" data-action="delete" title="Удалить">
                                                        <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div class="card-question">${card.title}</div>
                                                <div class="card-answer">${card.answer}</div>
                                            </div>
                                        </div>
                                    `).join('')}
                            `;
    }

    addCardToCategory(cardObj) {
        const category = this.findCategory(this.currentCategoryId);
        if (category) {
            category['cards'].push(cardObj);
            category.cardCount += 1;
        }
    }

    deleteCardFromCategory(cardId) {
        const category = this.findCategory(this.currentCategoryId);
        if (category) {
            const cardIndex = category.cards.findIndex(card => card.id === cardId);
            if (cardIndex !== -1) {
                category.cards.splice(cardIndex, 1);
                category.cardCount = category.cards.length;
            }
        }
    }
    /*  END Обработка формы на создание карточки */

    /*  Обработка формы на создание категории */
    addListenersToCategories() {
        let categoriesContainer = document.querySelector('.categories-list');
        categoriesContainer.addEventListener('click', this.handleCategoryEvent);

        let addCategoryButton = document.getElementById('addCategoryButton');
        addCategoryButton.addEventListener('click', this.handleAddCategoryEvent);
    }

    handleCategoryEvent = event => {
        let actionElement = event.target.closest('[data-action]');
        if (!actionElement) return;

        const action = actionElement.dataset.action;

        switch (action) {
            case "delete":
                this.deleteCategory(event);
                break;
            case 'change':
                this.changeCategoryHandle(event);
                break;
            case 'select':
                this.selectCategory(event);
                break;
        }
    }

    handleAddCategoryEvent = event => {
        this.categoryForm.openForCreate();
    }

    selectCategory(event) {
        let elem = event.target.closest('[data-category-id]');
        this.currentCategoryId = Number(elem.getAttribute('data-category-id'));
        this.setActiveCategory(elem);
        const category = this.findCategory(this.currentCategoryId);
        this.resetCardsTitle(category.name);
        this.showCards(this.currentCategoryId);
        this.showCardActions();
    }

    deleteCategory(event) {
        let categoryElem = event.target.closest('[data-category-id]');
        let categoryId = Number(categoryElem.getAttribute('data-category-id'));

        fetch(`/api/v1/cards/category/${categoryId}`, {
            method: 'DELETE',
        }).then(r => {});

        categoryElem.remove();
        this.deleteCategoryFromData(categoryId);

        if(categoryId === this.currentCategoryId) {
            this.deleteCategoryCardsFromHTML(categoryId);
            this.resetCardsTitle();
            this.closeCardActions();
        }
    }

    changeCategoryHandle(event) {
        let categoryObj = this.findCategory(Number(event.target.closest('[data-category-id]').getAttribute('data-category-id')));
        this.categoryForm.openForUpdate(categoryObj);
    }

    deleteCategoryCardsFromHTML() {
        let cards = document.querySelectorAll(".card-item");
        cards.forEach(item => {
            item.removeEventListener("click", this.handleDeleteCard);
        })
        document.querySelector('.cards-grid').innerHTML = "";
    }

    resetCardsTitle(value) {
        let title = document.querySelector('.cards-title');
        title.innerHTML = `${value ?? "Выберите категорию"}`;
    }

    updateCountCategory(categoryId) {
        const category = this.cardCategories.find(category => category.id === categoryId);
        let categoryElem = document.querySelector(`[data-category-id="${this.currentCategoryId}"]`);
        categoryElem.querySelector('.card-count').innerHTML = category.cardCount;
    }

    handleCategoryCreated(newCategory) {
        this.cardCategories.push(newCategory);
        const categoriesList = document.getElementById('categoriesList');
        let li = document.createElement('li');
        li.className = 'category-item';
        li.setAttribute('data-category-id', newCategory.id);
        li.setAttribute('data-action', "select");
        li.innerHTML = `
                            <div class="category-item-content">
                                <span class="category-name">${newCategory.name}</span>
                            </div>
                            <div class="category-item-actions">
                                <button class="btn-category-action btn-edit btn-change" data-action="change" title="Редактировать">
                                    <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                                        <path d="m15 5 4 4"></path>
                                    </svg>
                                </button>
                                <button class="btn-category-action btn-delete btn-close" data-action="delete" title="Удалить">
                                    <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                            <span class="card-count">${newCategory.cardCount}</span>`;
        categoriesList.appendChild(li);
        this.currentCategoryId = newCategory.id;
        this.setActiveCategory(li);
        this.resetCardsTitle(newCategory.name);
        this.showCards(this.currentCategoryId);
        this.showCardActions();
    }

    handleCategoryUpdated(category) {
        let categoryObj = this.findCategory(category.id);
        categoryObj.name = category.name;
        categoryObj.description = category.description;
        let elem = document.querySelector(`[data-category-id="${category.id}"]`);
        elem.querySelector('.category-name').innerHTML = category.name;

        if (category.id = this.currentCategoryId) {
            document.querySelector('.cards-title').innerHTML = category.name;
        }
    }

    setActiveCategory(element) {
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });
        element.classList.add('active');
    }
    /*  END Обработка формы на создание категории */

    showCardActions() {
        let btns = document.querySelector('.cards-actions');
        btns.style.visibility = "visible";
    }

    closeCardActions() {
        let btns = document.querySelector('.cards-actions');
        btns.style.visibility = "hidden";
    }

    deleteCategoryFromData(categoryId) {
        let index = this.cardCategories.findIndex(c => c.id === categoryId);

        if (index !== -1) {
            this.cardCategories.splice(index, 1);
        }
    }

    findCategory(categoryId) {
        return this.cardCategories.find(c => c.id === categoryId);
    }

    findCard(categoryObj, cardId) {
        return categoryObj["cards"].find(card => card.id === cardId);
    }
}