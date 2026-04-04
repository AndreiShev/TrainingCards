class CardsStore {
    state;

    constructor() {
        this.state = {
            categories: [],
            category: [],
            activeCategoryId: null,
            cards: []
        }

        this.listeners = []
    }

    init(categories) {
        this.state.categories = categories;
    }

    getState() {
        return this.state
    }

    setState(newState) {
        for (let key in newState) {
            this.state[key] = newState[key];
        }

        // уведомляем всех подписчиков
        this.listeners.forEach(listener => listener(this.state))
    }

    addCategory(category) {
        let categories = this.state.categories;
        categories.push(category);
        const selectedCategory = this.state.categories.find(c => c.id === category.id);
        const cards = category ? category.cards : [];

        this.setState({
            categories: categories,
            activeCategoryId: category.id,
            category: selectedCategory,
            cards: cards
        });
    }

    subscribe(listener) {
        this.listeners.push(listener)
    }

    unSubscribe(listener) {
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener)
        }
    }

    setActiveCategory(categoryId) {
        const selectedCategory = this.state.categories.find(c => c.id === categoryId);
        const category = selectedCategory ? selectedCategory : [];
        const cards = selectedCategory ? selectedCategory.cards : [];

        this.setState({
            activeCategoryId: categoryId,
            category: category,
            cards: cards
        });
    }

    getActiveCategory() {
        return this.state.category;
    }

    getActiveCategoryId() {
        return this.state.activeCategoryId;
    }

    getCards() {
        return this.state.cards;
    }

    findCategory(categoryId) {
        return this.state.categories.find(c => c.id === categoryId);
    }

    findCard(categoryObj, cardId) {
        return categoryObj["cards"].find(card => card.id === cardId);
    }

    deleteCategory(categoryId) {
        let categories = this.state.categories;
        let index = categories.findIndex(c => c.id === categoryId);

        if (index !== -1) {
            categories.splice(index, 1);
        }

        let result = {};
        result.categories = categories;
        if (categoryId === this.state.activeCategoryId) {
            result.cards = [];
            result.activeCategoryId = null;
            result.category = null;
        }

        this.setState(result);
    }

    addCardToCategory(cardObj) {
        const category = this.getActiveCategory();
        if (category) {
            category['cards'].push(cardObj);
            category.cardCount += 1;
        }

        this.setState({ category: category, cards: category.cards });
    }

    deleteCardFromCategory(cardId) {
        const category = this.getActiveCategory();
        if (category) {
            const cardIndex = category.cards.findIndex(card => card.id === cardId);
            if (cardIndex !== -1) {
                category.cards.splice(cardIndex, 1);
                category.cardCount = category.cards.length;
            }
        }

        this.setState({ category: category})
    }
}

const store = new CardsStore();
export default store;