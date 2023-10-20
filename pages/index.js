import { Card }  from "../components/Card.js";
import { FormValidator, settings } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
    buttonOpenEditProfilePopup,
    buttonOpenAddCardPopup,
    buttonOpenEditAvatar,
    formPopupAddCard,
    formPopupSaveProfile,
    formPopupEditAvatar,
    userData,
    apiConfig,
    avatar
} from "../utils/constants.js";
import './index.css';
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const popupImage = new PopupWithImage('.popup-images');
const formValidatorEdit = new FormValidator(settings, formPopupSaveProfile);
formValidatorEdit.enableValidation();
const formValidatorAdd = new FormValidator(settings, formPopupAddCard);
formValidatorAdd.enableValidation();
const popupEditForm = new PopupWithForm('.popup-edit', handleEditProfileSubmit);
const popupAddForm = new PopupWithForm('.popup-add', handleNewCardSubmit);
const userInfo = new UserInfo(userData);
const api = new Api(apiConfig);
const popupFormConfirmation = new PopupWithConfirmation('.popup-delete', handleConfirmation)
const popupEditAvatar = new PopupWithForm('.popup-avatar', handleAvatarChange);
const section = new Section({
    items: [],
    renderer: addNewCard
}, '.template-section');

const formValidatorAvatar = new FormValidator(settings, formPopupEditAvatar);
formValidatorAvatar.enableValidation();
let userCurrentId;


api.getInitialCards()
    .then((cards) => {
        renderInitialCards(cards);
    })
    .catch((error) => {
        console.error(`Ошибка при загрузке начальных карточек: ${error}`);
    });

api.getUserInfoApi()
    .then((data) => {
        userCurrentId = data['_id'];
        userInfo.setUserInfo(data.name, data.about);
    })
    .catch((error) => {
        console.error(`Ошибка при загрузке данных профиля: ${error}`)
    })

function raiseImagePopup (link, name) {
    popupImage.open(link, name);
}

function raiseEditProfilePopup () {
    popupEditForm.setInputValues(userInfo.getUserInfo());
    popupEditForm.open();
}

function raiseAddCardPopup () {
    formValidatorAdd.resetValidation();
    popupAddForm.setInputValues({
        name: '',
        link: ''
    });
    popupAddForm.open();
}

function raiseConfirmationPopup (id, card) {
    popupFormConfirmation.open(id, card);
}

function raiseEditAvatarPopup () {
    formValidatorAvatar.resetValidation();
    popupEditAvatar.open();
}

function handleEditProfileSubmit (data) {
    popupEditForm.showPreloader();
    api.setUserInfoApi(data)
        .then((data) => {
            userInfo.setUserInfo(data.name, data.about);
        })
        .catch((error) => {
            console.error(`Ошибка при отправке данных пользователя: ${error}`);
        })
        .finally(() => popupEditForm.showPreloader(false))
}


function handleNewCardSubmit (data) {
    popupAddForm.showPreloader()
    api.uploadCard(data)
        .then ((data) => {
            section.addItem(addNewCard(data, userCurrentId));
            popupAddForm.close();
        })
        .catch((error) => {
            console.error(`Ошибка при при загрузке карточки: ${error}`);
        })
        .finally(() => popupEditForm.showPreloader(false));

}

function handleConfirmation (id, card) {
    popupFormConfirmation.showPreloader();
    api.deleteCard(id)
        .then(() => {
            card.removeCard();
            popupFormConfirmation.close();
        })
        .catch((error) => {
            console.log(`Ошибка удаления: ${error}`);
            popupFormConfirmation.close();
        })
        .finally(() => {
            popupFormConfirmation.showPreloader(false);
        })
}

function handleAvatarChange (data) {
    popupEditAvatar.showPreloader();
    api.setNewAvatar(data)
        .then((res) => {
            avatar.style.backgroundImage = `url(${res.avatar})`;
        })
        .catch((error) => {
            console.error(`Ошибка при обновлении аватара: ${error}`);
        })
        .finally(() => popupEditAvatar.showPreloader(false));

}

function addNewCard (data, userCurrentId) {
    const createCardElement = new Card({
        cardData: data,
        userid: userCurrentId,
        handleCardClick: raiseImagePopup,
        handleCardDeletion: raiseConfirmationPopup,
        putCardLike: handleCardLike,
        removeCardLike: handleCardDislike
    }, ".element-tmp");
    return createCardElement.getCard();
}

function renderInitialCards (card) {
    card.reverse().forEach((data) => {
        section.addItem(addNewCard(data, userCurrentId))
    })
}

function handleCardLike (id) {
    api.likeCard(id)
        .then((res) => {
            this.renderLikes(res);
        })
        .catch((error) => console.log(`Ошибка отправки запроса на сервер при попытке лайка: ${error}`))
}

function handleCardDislike (id) {
    api.dislikeCard(id)
        .then((res) => {
            this.renderLikes(res)
        })
        .catch((error) => console.log(`Ошибка отправки запроса на сервер при попытке отмены лайка: ${error}`))
}

buttonOpenEditProfilePopup.addEventListener('click', raiseEditProfilePopup);
buttonOpenAddCardPopup.addEventListener('click', raiseAddCardPopup);
buttonOpenEditAvatar.addEventListener('click', raiseEditAvatarPopup);