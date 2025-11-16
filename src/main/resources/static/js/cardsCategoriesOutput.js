export default class CardsCategoriesOutput {
    element;

    constructor() {

    }

    loadCategories() {

    }

    initCategories() {
        const categoriesList = document.getElementById('categoriesList');
        categoriesList.innerHTML = '';

        categories.forEach(category => {
            const li = document.createElement('li');
            li.className = 'category-item';
            li.innerHTML = `
                    <span>${category.name}</span>
                    <span class="card-count">${category.cardCount}</span>
                `;
            li.onclick = () => selectCategory(category.id);
            categoriesList.appendChild(li);
        });
    }
}