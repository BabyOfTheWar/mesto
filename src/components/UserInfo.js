class UserInfo {
    constructor(userData) {
        this._name = userData.name;
        this._about = userData.about;
        this._avatar = userData.avatar;
    }

    getUserInfo () {
        return {
            name: this._name.textContent,
            about: this._about.textContent,
            avatar: this._avatar.src
        };
    }

    setUserInfo (name, about, avatar) {
        this._name.textContent = name;
        this._about.textContent = about;
        this._avatar.src = avatar;
    }

}

export default UserInfo