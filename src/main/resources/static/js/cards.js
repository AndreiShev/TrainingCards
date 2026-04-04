import CategoryForm from './forms/categoryForm.js';
import CardForm from './forms/cardForm.js';
import store from './cardsStore.js';

export default class Cards {
    categoryForm;
    cardForm;

    constructor() {
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

        this.cardForm = new CardForm();
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

        this.subscribe();
    }

    subscribe() {
        store.subscribe(this.setActiveCategory);
        store.subscribe(this.resetCardsTitle);
        store.subscribe(this.showCards);
        store.subscribe(this.toggleCardActions);
        store.subscribe(this.updateHTMLCountCategory)
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
        store.deleteCardFromCategory(cardId);
    }

    handleChangeCard(event) {
        let cardElem = event.target.closest('[data-card-id]');
        let cardId = Number(cardElem.getAttribute('data-card-id'));
        let cardObj = store.findCard(store.getActiveCategory(), cardId);
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
        store.addCardToCategory(newCard);
    }

    handleCardUpdated(card) {
        const cardsContainer = document.querySelector('.cards-grid');
        let elem = cardsContainer.querySelector(`[data-card-id="${card.id}"]`);
        elem.querySelector('.card-question').innerHTML = card["title"];
        elem.querySelector('.card-answer').innerHTML = card["answer"];

        let cardObj = store.findCard(store.getActiveCategory(), card.id);
        cardObj["question"] = card["title"];
        cardObj["answer"] = card["answer"];
    }

    showCards = () => {
        const cardsContainer = document.querySelector('.cards-grid');

        if (store.getCards().length === 0) {
            cardsContainer.innerHTML = ``;
            return;
        }

        cardsContainer.innerHTML = `
                                    ${store.getCards().map(card => `
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
        store.setActiveCategory(Number(elem.getAttribute('data-category-id')));
    }

    deleteCategory(event) {
        let categoryElem = event.target.closest('[data-category-id]');
        let categoryId = Number(categoryElem.getAttribute('data-category-id'));

        fetch(`/api/v1/cards/category/${categoryId}`, {
            method: 'DELETE',
        }).then(r => {});

        categoryElem.remove();
        store.deleteCategory(categoryId);
        this.deleteCategoryCardsFromHTML(categoryId);
    }

    changeCategoryHandle(event) {
        let categoryObj = store.findCategory(Number(event.target.closest('[data-category-id]').getAttribute('data-category-id')));
        this.categoryForm.openForUpdate(categoryObj);
    }

    deleteCategoryCardsFromHTML(categoryId) {
        if (categoryId !== store.getActiveCategoryId()) {
            return;
        }

        let cards = document.querySelectorAll(".card-item");
        cards.forEach(item => {
            item.removeEventListener("click", this.handleDeleteCard);
        })
        document.querySelector('.cards-grid').innerHTML = "";
    }

    resetCardsTitle = () => {
        let title = document.querySelector('.cards-title');
        if (store.getActiveCategory() !== null) {
            title.innerHTML = store.getActiveCategory().name;
            return;
        }

        title.innerHTML = "Выберите категорию";
    }

    updateHTMLCountCategory() {
        const category = store.getActiveCategory();
        let categoryElem = document.querySelector(`[data-category-id="${store.getActiveCategoryId()}"]`);
        categoryElem.querySelector('.card-count').innerHTML = category.cardCount;
    }

    handleCategoryCreated(newCategory) {
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
        store.addCategory(newCategory);
    }

    handleCategoryUpdated(category) {
        let categoryObj = store.findCategory(category.id);
        categoryObj.name = category.name;
        categoryObj.description = category.description;
        let elem = document.querySelector(`[data-category-id="${category.id}"]`);
        elem.querySelector('.category-name').innerHTML = category.name;

        if (category.id === store.getActiveCategoryId()) {
            document.querySelector('.cards-title').innerHTML = category.name;
        }
    }

    setActiveCategory = () => {
        if (store.getActiveCategory() === null) {
            return;
        }

        let element = document.querySelector(`[data-category-id="${store.getState().activeCategoryId}"]`);
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });
        element.classList.add('active');
    }
    /*  END Обработка формы на создание категории */

    toggleCardActions = () => {
        let btns = document.querySelector('.cards-actions');

        if (store.getActiveCategory()) {
            btns.style.visibility = "visible";
            return;
        }

        btns.style.visibility = "hidden";
    }
}