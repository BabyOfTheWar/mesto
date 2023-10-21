class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
        this.formInputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this.buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    }

    _isValid(inputElement) {
        return inputElement.validity.valid;
    }

    _hasInvalidInput(formInputList) {
        return formInputList.some(inputElement => !this._isValid(inputElement));
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this.formInputList)) {
            this.buttonElement.classList.add(this._settings.inactiveButtonClass);
            this.buttonElement.disabled = true;
        } else {
            this.buttonElement.classList.remove(this._settings.inactiveButtonClass);
            this.buttonElement.disabled = false;
        }
    }

    _setEventListeners() {
        this.formInputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement) ? this._hideInputError(inputElement) : this._showInputError(inputElement, inputElement.validationMessage);
                this._toggleButtonState(this.formInputList, this.buttonElement);
            });
        });
    }

    resetValidation() {
        this._toggleButtonState();
        this.formInputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });



    }


    enableValidation() {
        this._setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

    }
}

const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-info',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error-message_active'
};

export { FormValidator, settings };