import store from '../cardsStore.js';

export default class CardForm {
    formElement;
    modalElement;
    submitBtn;
    cancelBtn;
    formStatus;
    formFields = new Map();
    onSuccess = null;
    onError = null;

    constructor() {
        this.buildCategoryModalWindow();
        this.setFormElement();
        this.setUIButtons();
        this.collectFormFields();
    }

    buildCategoryModalWindow() {
        let sModal = `<div class="modal-window" id="modalWindowAddCard">
                    <div class="modal-window__content">
                        <div class="modal-header">Создание карточки</div>
                        <form class="modal-form" name="addCardForm" id="cardForm">
                            <input class="form-input" type="text" name="title" placeholder="Вопрос" value="" required>
                            <textarea class="form-textarea" name="answer" placeholder="Ответ" required></textarea>
                            <input class="form-input" type="hidden" name="category" value="">
                            <input class="form-input" type="hidden" name="id" value="">
                            <div class="modal-window_btns">
                                <button type="button" class="modal-form__reset btn-secondary">Отменить</button>
                                <input class="modal-form__submit btn-primary" type="submit" value="Создать" id="requestCardButton">
                            </div>
                        </form>
                    </div>
                </div>`;
        document.body.insertAdjacentHTML('afterend', sModal);
        this.modalElement = document.getElementById('modalWindowAddCard');
    }

    setFormElement() {
        this.formElement = this.modalElement.querySelector('.modal-form');
    }

    setUIButtons() {
        this.submitBtn = this.formElement.querySelector('.modal-form__submit');
        this.cancelBtn = this.formElement.querySelector('.modal-form__reset');
    }

    setCallbacks({ onSuccess, onError }) {
        this.onSuccess = onSuccess;
        this.onError = onError;
    }

    collectFormFields() {
        if (!this.formElement) {
            return;
        }

        let elements = this.formElement.elements;
        for (let element of elements) {
            if (element.type === 'submit' ||
                element.type === 'button' ||
                !element.name ||
                element.name === '') {
                continue;
            }

            this.formFields.set(element.name, {
                element: element,
                name: element.name,
                type: element.type,
                setValue: (value) => this.setFieldValue(element, value)
            });
        }
    }

    toggleCategoryModelWindow() {
        this.modalElement.classList.toggle('open');
    }

    openForCreate(data) {
        this.formStatus = 'create';
        this.cancelBtn.addEventListener('click', this.closeCardForm);
        this.submitBtn.addEventListener('click', this.handleSubmitAddCard);
        this.prepareForm(data);
        this.toggleCategoryModelWindow();
    }

    openForUpdate(data) {
        this.formStatus = 'update';
        this.cancelBtn.addEventListener('click', this.closeCardForm);
        this.submitBtn.addEventListener('click', this.handleSubmitChangeCard);
        this.prepareForm(data);
        this.toggleCategoryModelWindow();
    }

    closeCardForm = event => {
        this.cancelBtn.removeEventListener('click', this.closeCardForm);
        this.submitBtn.removeEventListener('click', this.handleSubmitAddCard);
        this.submitBtn.removeEventListener('click', this.handleSubmitChangeCard);
        this.toggleCategoryModelWindow();
    }

    prepareForm(data) {
        switch (this.formStatus) {
            case "create":
                for(let element of this.formFields.values()) {
                    element.setValue("");

                    if (element.name === "category") {
                        element.setValue(store.getActiveCategoryId());
                    }
                }
                this.submitBtn.value = "Создать";
                break;
            case "update":
                for(let element of this.formFields.values()) {
                    element.setValue(data[element.name]);

                    if (element.name === "category") {
                        element.setValue(store.getActiveCategoryId());
                    }
                }
                this.submitBtn.value = "Обновить";
                break;
        }
    }

    setFieldValue(element, value) {
        element.value = value;
    }

    handleSubmitAddCard = event => {
        event.preventDefault();
        let formData = new FormData(this.formElement);
        let json = JSON.stringify({
            title: formData.get('title'),
            answer: formData.get('answer'),
            category: formData.get('category'),
        });
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/v1/cards/card");
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json);

        xhr.onload = () => {
            let newCard = JSON.parse(xhr.response);

            if (this.onSuccess) {
                this.onSuccess('create', newCard);
            }

            this.closeCardForm();
        }
    }

    handleSubmitChangeCard = event => {
        event.preventDefault();
        let formData = new FormData(this.formElement);
        let json = JSON.stringify({
            id: formData.get('id'),
            title: formData.get('title'),
            answer: formData.get('answer'),
            category: formData.get('category'),
        });
        let xhr = new XMLHttpRequest();
        xhr.open("PUT", "/api/v1/cards/card");
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json);

        xhr.onload = () => {
            let card = JSON.parse(xhr.response);

            if (this.onSuccess) {
                this.onSuccess('update', card);
            }

            this.closeCardForm();
        }
    }
}