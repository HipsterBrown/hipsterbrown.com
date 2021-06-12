class RandomWord extends HTMLElement {
  connectedCallback() {
    const word = this.words[Math.floor(Math.random() * this.words.length)];
    this.innerText = word;
  }

  get words() {
    return [
      "ironic",
      "authentic",
      "vintage",
      "classic",
      "hip",
      "confident"
    ];
  }
}

customElements.define('random-word', RandomWord);
