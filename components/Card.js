class Card {
    constructor({ cardData, userid, handleCardClick, handleCardDeletion, putCardLike, removeCardLike}, templateSelector) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._likes = cardData.likes;
        this._currentCard = cardData;
        this._likeCounter = this._likes.length
        this._id = cardData['_id'];
        this._templateSelector = templateSelector;
        this._newCard = this._getTemplate();
        this._likebutton = this._newCard.querySelector('.element__footer-button')
        this.cardImage = this._newCard.querySelector('.element__img');
        this._cardlikeCounter = this._newCard.querySelector('.element__like-counter');
        this._handleCardClick = handleCardClick;
        this._handleCardDeletion = handleCardDeletion;
        this._trashButton = this._newCard.querySelector('.element__trash-button');
        this._ownerid = cardData.owner['_id'];
        this._userid = userid;
        this._putLike = putCardLike;
        this._removeLike = removeCardLike;
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
        this._cardlikeCounter.textContent = this._likeCounter;
        this.renderLikes(this._currentCard);
        if (this._ownerid !== this._userid) {
            this._trashButton.remove();
        }
    }

    removeCard() {
        this._newCard.remove();
        this._newCard = null;
    }

    renderLikes(cardData) {
        this._likes = cardData.likes;
        this._likeCounter = this._likes.length;

        if (this._likeCounter === 0) {
            this._cardlikeCounter.textContent = '0';
        } else {
            this._cardlikeCounter.textContent = this._likeCounter;
        }

        if (this._likeCardExist()) {
            this._likebutton.classList.add('element__footer-button_active');
        } else {
            this._likebutton.classList.remove('element__footer-button_active');
        }
    }
    _setListeners() {
        this._trashButton
            .addEventListener('click', () => { this._handleCardDeletion(this._id, this) });

        this._newCard.querySelector('.element__footer-button')
            .addEventListener('click', this._toggleLike.bind(this));

        this.cardImage.addEventListener('click', () => {
            this._handleCardClick(this._link, this._name);
        });

    }

    _likeCardExist() {
        return this._likes.some(like => like['_id'] === this._userid)
    };

    _toggleLike() {
        if (this._likeCardExist()) {
            this._removeLike(this._id);
        } else {
            this._putLike(this._id);
        }
    }

    getCard() {
        this._setData();
        this._setListeners();
        return this._newCard;
    }
}

export { Card };
