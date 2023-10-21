import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputs = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        this._submitButton = this._popupForm.querySelector('.popup__button-save');
        this._submitButtonDefault = this._submitButton.textContent;
    }

    _getInputValues() {
        const values = {};
        this._inputs.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }

    setInputValues(data) {
        this._inputs.forEach((input) => {
            if (data[input.name]) {
                input.value = data[input.name];
            }
        });
    }

    setEventListeners() {
        if (this._popup) {
            this._popup.addEventListener('submit', (event) => {
                event.preventDefault();
                this._handleFormSubmit(this._getInputValues());
            });
        }
        super.setEventListeners();
    }

    showPreloader(isLoading = true) {
        isLoading ? this._submitButton.textContent = 'Сохранение...' : this._submitButton.textContent = this._submitButtonDefault
    }

    close() {
        this._popupForm.reset();
        super.close();
    }
}

export default PopupWithForm