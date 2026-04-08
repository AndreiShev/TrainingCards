class LearningStore {
    state;

    constructor() {
        this.state = {
            cards: [],
            count: 0,
            activeCard: {}
        }

        this.listeners = [];
    }

    init(cards) {
        this.setState({cards: cards ?? [],
            count: cards ? cards.length : 0,
            activeCard: cards ? cards[cards.length - 1] : {} })

        console.log(cards);
    }

    getState() {
        return this.state
    }

    getCount() {
        return this.state.count;
    }

    setState(newState) {
        for (let key in newState) {
            this.state[key] = newState[key];
        }

        this.listeners.forEach(listener => listener(this.state))
    }

    subscribe(listener) {
        this.listeners.push(listener)
    }

    /*Извлекается последняя карточка ввиду таковой сортировки на беке.
    * Сделано с целью улучшения производительности*/
    extractDisplayedCard() {
        try {
            let result = this.state.cards.pop();
            let cards = this.state.cards;

            this.setState(
                {cards: cards ?? [],
                    count: cards ? cards.length : 0,
                    activeCard: cards ? cards[cards.length - 1] : {} }
            );

            console.log(this.state.cards);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    placeActiveCardInQueue() {
        let cards = this.state.cards;
        let activeCard = this.state.cards.pop();
        let index = this.state.cards.length > 0 ? this.state.cards.length - 1 : 0;

        cards.splice(index, 0, activeCard);

        this.setState(
            {cards: cards ?? [],
                count: cards ? cards.length : 0,
                activeCard: cards ? cards[cards.length - 1] : {} }
        );
    }

    getCards() {
        return this.state.cards;
    }

    getActiveCard() {
        return this.state.activeCard;
    }

    getDefaultCard() {
        return {answer: "Карточки закончились",
            id: -1,
            interval: 0,
            lastReviewedAt: "2026-04-03T05:30:49.022822Z",
            nextReviewAt: "2026-04-03T05:30:49.022822Z",
            repetitions: 0,
            title: "Карточки закончились"};
    }
}

const learnStore = new LearningStore();
export default learnStore;