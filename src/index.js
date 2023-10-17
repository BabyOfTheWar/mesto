import { Card }  from "../scripts/Card.js";
import { FormValidator, settings } from "../scripts/FormValidator.js";
import { Section } from "../scripts/Section.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import { cardsInitial,
    buttonOpenEditProfilePopup,
    buttonOpenAddCardPopup,
    formPopupAddCard,
    formPopupSaveProfile,
    userData
} from "../utils/constants.js";
import './index.css';


const popupImage = new PopupWithImage('.popup-images');
const formValidatorEdit = new FormValidator(settings, formPopupSaveProfile);
formValidatorEdit.enableValidation();
const formValidatorAdd = new FormValidator(settings, formPopupAddCard);
formValidatorAdd.enableValidation();
const section = new Section({
    items: cardsInitial,
    renderer: addNewCard
}, '.template-section');
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
    formValidatorAdd.resetValidation();
    popupAddForm.setInputValues({
        name: '',
        link: ''
    });
    popupAddForm.open();
}

function handleEditProfileSubmit (data) {
    userInfo.setUserInfo(data.name, data.description);
}

function handleNewCardSubmit (data) {
    section.addItem(addNewCard(data.name, data.link));
    popupAddForm.close();
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
    section.render();
}

buttonOpenEditProfilePopup.addEventListener('click', raiseEditProfilePopup);
buttonOpenAddCardPopup.addEventListener('click', raiseAddCardPopup);