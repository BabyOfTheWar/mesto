const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const formPopupAddCard = document.forms["profile-card"];
const formPopupSaveProfile = document.forms["profile-edit"];
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__title');
const inputNameFormAddCard = document.querySelector('.popup__form-info_input-card-name');
const inputLinkFormAddCard = document.querySelector('.popup__form-info_input-card-ink');
const cardData = {
    name: "",
    link: ""
};
const userData = {
    name: profileName,
    description: profileJob
};
const cardsInitial = [

    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },

    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },

    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },

    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },

    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },

    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    }

];

export { cardsInitial,
    buttonOpenEditProfilePopup,
    buttonOpenAddCardPopup,
    formPopupAddCard,
    formPopupSaveProfile,
    profileName,
    profileJob,
    inputNameFormAddCard,
    inputLinkFormAddCard,
    cardData,
    userData
};
