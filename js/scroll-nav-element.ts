class ScrollNavElement extends HTMLElement {
    lastScroll: number = 0;
    mq = window.matchMedia("screen and (min-width: 710px)");
    stache: HTMLElement | null = document.getElementById("break");
    state: 'mobile' | 'default' = 'default';

    connectedCallback() {
        this.state = this.mq.matches ? "default" : "mobile";
        window.addEventListener("scroll", this.animateScroll.bind(this));
        this.stache?.addEventListener("click", this.toggleMenu.bind(this));
        this.mq.addEventListener("change", this.matchListener.bind(this));
    }

    disconnectedCallback() {
        window.removeEventListener("scroll", this.animateScroll.bind(this));
        this.stache?.removeEventListener("click", this.toggleMenu.bind(this));
        this.mq.removeEventListener("change", this.matchListener.bind(this));
    }

    animateScroll() {
        if (this.state === 'mobile') return;

        const { scrollY } = window;

        if (scrollY + this.lastScroll >= 100) {
            this.classList.add("scrolled");

            if (scrollY < this.lastScroll) {
                this.classList.remove("scrolled");
            }
        } else if (scrollY < this.lastScroll) {
            this.classList.remove("scrolled");
        }

        this.lastScroll = scrollY;
    }

    matchListener(event: MediaQueryListEvent) {
        this.classList.remove("open");
        this.state = event.matches ? "default" : "mobile";
    }

    toggleMenu(event: MouseEvent) {
        if (this.state === 'mobile') {
            event.preventDefault();
            this.classList.toggle("open");
        }
    }
}

customElements.define('scroll-nav', ScrollNavElement)
