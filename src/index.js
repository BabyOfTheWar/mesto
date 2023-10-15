import { Card }  from "../scripts/Card.js";
import { FormValidator, settings } from "../scripts/FormValidator.js";
import { cardsInitial } from "../scripts/cards.js";
import { Section } from "../scripts/Section.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import './index.css';

const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const formPopupAddCard = document.forms["profile-card"];
const formPopupSaveProfile = document.forms["profile-edit"];
const nameInput = document.querySelector('.popup__form-info_input_name');
const jobInput = document.querySelector('.popup__form-info_input_title');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__title');
const inputNameFormAddCard = document.querySelector('.popup__form-info_input-card-name');
const inputLinkFormAddCard = document.querySelector('.popup__form-info_input-card-ink');
const popupImage = new PopupWithImage('.popup-images');
const formValidatorEdit = new FormValidator(settings, formPopupSaveProfile);
formValidatorEdit.enableValidation();
const formValidatorAdd = new FormValidator(settings, formPopupAddCard);
formValidatorAdd.enableValidation();
const cardData = {
    name: "",
    link: ""
};
const userData = {
    name: profileName,
    description: profileJob
};
const popupEditForm = new PopupWithForm('.popup-edit', handleEditProfileSubmit);
const popupAddForm = new PopupWithForm('.popup-add', handleNewCardSubmit);
const userInfo = new UserInfo(userData);

renderInitialCards();
userInfo.getUserInfo();

function raiseImagePopup (link, name) {
    popupImage.open(link, name);
}

function raiseEditProfilePopup () {
    popupEditForm.open();
}

function raiseAddCardPopup () {
    popupAddForm.open();
}

function handleEditProfileSubmit () {
    userInfo.setUserInfo(nameInput.value, jobInput.value);
}

function handleNewCardSubmit () {
    cardData.name = inputNameFormAddCard.value;
    cardData.link =  inputLinkFormAddCard.value;
    const section = new Section({
        items: [cardData],
        renderer: addNewCard
    }, '.template-section');
    section.render();
    popupAddForm.close();
    formPopupAddCard.reset();
}

function addNewCard (name, link, ) {
    const createCardElement = new Card({
        name: name,
        link: link,
        handleCardClick: raiseImagePopup
    }, ".element-tmp");
    return createCardElement.getCard();
}

function renderInitialCards () {
    const section = new Section({
        items: cardsInitial,
        renderer: addNewCard
    }, '.template-section');
    section.render();
}

buttonOpenEditProfilePopup.addEventListener('click', raiseEditProfilePopup);
buttonOpenAddCardPopup.addEventListener('click', raiseAddCardPopup);