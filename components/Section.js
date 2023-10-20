class Section {
    constructor({items, renderer, userID},  templateSelector) {
        this._items = items;
        this._renderer = renderer;
        this._id = userID;
        this._templateSelector = document.querySelector(templateSelector);
    }

    render() {
        this._items.forEach(item => {
            const element = this._renderer(item.name, item.link, item.likes, this._id);
            this.addItem(element);
        });
    }

    addItem(element) {
        this._templateSelector.prepend(element);
    }
}

export { Section };