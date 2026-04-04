import store from '../cardsStore.js';

export default class CategoryForm {
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
        let sModal = `<div class="modal-window" id="modalWindowAddCategory">
                <div class="modal-window__content">
                    <div class="modal-header">Создание категории</div>
                    <form class="modal-form" name="addCategoryForm" id="categoryForm">
                        <input class="form-input" type="text" name="name" placeholder="Наименование категории" value="" required>
                        <textarea class="form-textarea" name="description" placeholder="Описание" required></textarea>
                        <input class="form-input" type="hidden" name="id" value="">
                        <div class="modal-window_btns">
                            <button type="button" class="modal-form__reset btn-secondary">Отменить</button>
                            <input class="modal-form__submit btn-primary" type="submit" value="Создать" id="addCategoryButton">
                        </div>
                    </form>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('afterend', sModal);
        this.modalElement = document.getElementById('modalWindowAddCategory');
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
        this.cancelBtn.addEventListener('click', this.closeCategoryForm);
        this.submitBtn.addEventListener('click', this.handleSubmitAddCategory);
        this.prepareForm(data);
        this.toggleCategoryModelWindow();
    }

    openForUpdate(data) {
        this.formStatus = 'update';
        this.cancelBtn.addEventListener('click', this.closeCategoryForm);
        this.submitBtn.addEventListener('click', this.handleSubmitChangeCategory);
        this.prepareForm(data);
        this.toggleCategoryModelWindow();
    }

    closeCategoryForm = event => {
        this.cancelBtn.removeEventListener('click', this.closeCategoryForm);
        this.submitBtn.removeEventListener('click', this.handleSubmitAddCategory);
        this.submitBtn.removeEventListener('click', this.handleSubmitChangeCategory);
        this.toggleCategoryModelWindow();
    }

    prepareForm(data) {
        switch (this.formStatus) {
            case "create":
                for(let element of this.formFields.values()) {
                    element.setValue("");
                }
                this.submitBtn.value = "Создать";
                break;
            case "update":
                for(let element of this.formFields.values()) {
                    element.setValue(data[element.name]);
                }
                this.submitBtn.value = "Обновить";
                break;
        }
    }

    setFieldValue(element, value) {
        element.value = value;
    }

    handleSubmitAddCategory = event => {
        event.preventDefault();
        let formData = new FormData(this.formElement);
        let json = JSON.stringify({
            name: formData.get('name'),
            description: formData.get('description')
        });
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/v1/cards/category");
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json);

        xhr.onload = () => {
            let newCategory = JSON.parse(xhr.response);

            if (this.onSuccess) {
                this.onSuccess('create', newCategory);
            }

            this.closeCategoryForm();
        }
    }

    handleSubmitChangeCategory = event => {
        event.preventDefault();
        let formData = new FormData(this.formElement);
        let json = JSON.stringify({
            name: formData.get('name'),
            description: formData.get('description'),
            id: formData.get('id'),
        });
        let xhr = new XMLHttpRequest();
        xhr.open("PUT", "/api/v1/cards/category");
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json);

        xhr.onload = () => {
            let category = JSON.parse(xhr.response);

            if (this.onSuccess) {
                this.onSuccess('update', category);
            }

            this.closeCategoryForm();
        }
    }

}