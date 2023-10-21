class Section {
    constructor({renderer},  templateSelector) {
        this._renderer = renderer;
        this._templateSelector = document.querySelector(templateSelector);
    }

    render(items) {
        items.reverse().forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element) {
        this._templateSelector.prepend(element);
    }
}

export { Section };