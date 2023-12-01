class DecapCMSElement extends HTMLElement {
  async connectedCallback() {
    try {
      const CMS = await import('decap-cms-app');
      CMS.init()
    } catch (error) {
      console.error('Unable to resolve decap-cms-app due to error: ', error)
      return;
    }
  }
}

customElements.define('decap-cms', DecapCMSElement);
