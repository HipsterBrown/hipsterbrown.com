import CMS from '@staticcms/core';
import '@staticcms/core/dist/main.css';

class StaticCMSElement extends HTMLElement {
  async connectedCallback() {
    try {
      CMS.init()
    } catch (error) {
      console.error('Unable to resolve @staticcms/core due to error: ', error)
      return;
    }
  }
}

customElements.define('static-cms', StaticCMSElement);
