class Card {
    constructor({ name, link, handleCardClick}, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._newCard = this._getTemplate();
        this.cardImage = this._newCard.querySelector('.element__img');
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._templateSelector).content
            .querySelector('.element')
            .cloneNode(true);
        return cardTemplate;
    }

    _setData() {
        this._newCard.querySelector('.element__footer-text').textContent = this._name;
        this.cardImage.src = this._link;
        this.cardImage.alt = this._name;
    }

    _removeCard() {
        this._newCard.remove();
        this._newCard = null;
    }

    _toggleLikeButtonState (event) { 
        const currentLikeImg = event.target;
        if (!currentLikeImg.classList.contains('element__footer-button_active')){
            currentLikeImg.classList.toggle('element__footer-button_active');
        }else {
            currentLikeImg.classList.toggle('element__footer-button_active');
        }
    }

    _setListeners() {
        this._newCard.querySelector('.element__trash-button')
            .addEventListener('click', () => { this._removeCard() });

        this._newCard.querySelector('.element__footer-button')
            .addEventListener('click', this._toggleLikeButtonState);

        this.cardImage.addEventListener('click', () => {
            this._handleCardClick(this._link, this._name);
        });

    }

    getCard() {
        this._setData();
        this._setListeners();
        return this._newCard;
    }
}

export { Card };
