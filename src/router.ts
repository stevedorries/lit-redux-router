import { LitElement, html } from '@polymer/lit-element';
import { installRouter } from 'pwa-helpers/router.js';

import { Store } from 'redux';
import { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer.js';
import { navigate } from './actions';

export default (store: Store & LazyStore) => {
  class Router extends LitElement {
    firstUpdated() {
      installRouter((location) => {
        const path = window.decodeURIComponent(location.pathname);
        return store.dispatch(navigate(path));
      });
    }

    render() {
      return html`<slot></slot>`;
    }
  }

  customElements.define('lit-router', Router);
};
