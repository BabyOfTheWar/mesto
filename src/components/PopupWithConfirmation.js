import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup{
    constructor(popupSelector, handleConfirmation) {
        super(popupSelector);
        this._submitCallback = handleConfirmation;
        this._submitButton = this._popup.querySelector('.popup__button-save');
        this._submitButtonDefault = this._submitButton.textContent;
    }

    open(id, card) {
        super.open();
        this.id = id;
        this.card = card;
    }

    showPreloader(isLoading = true) {
        isLoading ? this._submitButton.textContent = 'Удаление...' : this._submitButton.textContent = this._submitButtonDefault
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__button-save').addEventListener('click', () => {
            this._submitCallback(this.id, this.card);
        })
    }
}

export default PopupWithConfirmation;