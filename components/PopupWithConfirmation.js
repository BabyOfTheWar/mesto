import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup{
    constructor(popupSelector, handleConfirmation) {
        super(popupSelector);
        this._submitCallback = handleConfirmation;
        this._buttonSubmit = this._popup.querySelector('.popup__button-save');
    }

    open(id, card) {
        super.open();
        this.id = id;
        this.card = card;
    }

    showPreloader(isLoading = true) {
        isLoading ? this._buttonSubmit.textContent = 'Удаление...' : this._buttonSubmit.textContent = 'Да';
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__button-save').addEventListener('click', () => {
            this._submitCallback(this.id, this.card);
        })
    }
}

export default PopupWithConfirmation;