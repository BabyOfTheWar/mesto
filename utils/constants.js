const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const formPopupAddCard = document.forms["profile-card"];
const formPopupSaveProfile = document.forms["profile-edit"];
const formPopupEditAvatar = document.forms["form-avatar"];
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__title');
const avatar = document.querySelector('.profile__avatar');
const buttonOpenEditAvatar = document.querySelector('.profile__avatar');


const userData = {
    name: profileName,
    about: profileJob,
    avatar: avatar
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

const apiConfig = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-77/',
    headers:{
        'Content-Type': "application/json",
        authorization: '537e2371-52bd-46f5-8e26-db05f09a40f9'
    }
}

export { cardsInitial,
    buttonOpenEditProfilePopup,
    buttonOpenAddCardPopup,
    buttonOpenEditAvatar,
    formPopupAddCard,
    formPopupSaveProfile,
    formPopupEditAvatar,
    profileName,
    profileJob,
    userData,
    apiConfig,
    avatar
};
