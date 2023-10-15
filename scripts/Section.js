class Section {
    constructor({items, renderer}, templateSelector) {
        this._items = items;
        this._renderer = renderer;
        this._templateSelector = document.querySelector(templateSelector);
    }

    render() {
        this._items.forEach(item => {
            const element = this._renderer(item.name, item.link);
            this.addItem(element);
        });
    }

    addItem(element) {
        this._templateSelector.prepend(element);
    }
}

export { Section };