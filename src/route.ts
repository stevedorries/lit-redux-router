import { LitElement, html, property } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { Store } from 'redux';
import { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer.js';

import { addRoute } from './actions';
import { State } from './reducer';

export default (store: Store<State> & LazyStore) => {
  class Route extends connect(store)(LitElement) {
    @property({ type: Boolean })
    active = false;

    @property({ type: String })
    path;

    firstUpdated() {
      store.dispatch(addRoute(this.path));
    }

    stateChanged(state) {
      this.active = state.router.routes[this.path] && state.router.routes[this.path].active;
    }

    render() {
      if (!this.active) {
        return html``;
      }

      return html`<slot></slot>`;
    }
  }

  customElements.define('lit-route', Route);
};
