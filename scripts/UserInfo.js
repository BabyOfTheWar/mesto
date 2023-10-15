class UserInfo {
    constructor(userData) {
        this._name = userData.name;
        this._description = userData.description;
    }

    getUserInfo () {
        return {
            name: this._name.textContent,
            description: this._description.textContent
        };
    }

    setUserInfo (name, description) {
        this._name.textContent = name;
        this._description.textContent = description;
    }

}

export default UserInfo