class FitTextElement extends HTMLElement {
    connectedCallback() {
        if (this.heading) {
            const textLength = this.heading.textContent?.length || 0;
            if (textLength > 48) {
                this.heading.style.fontSize = "1.8em";
            }
            if (textLength > 36) {
                this.heading.style.fontSize = "2em";
            }
        }
    }

    get heading() {
        return this.querySelector('h1');
    }
}

customElements.define('fit-text', FitTextElement);
