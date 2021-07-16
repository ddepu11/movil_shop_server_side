import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import createAStore from './redux/store';
import App from './App';

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    redirectUri={window.location.origin}
  >
    <Provider store={createAStore()}>
      <App />
    </Provider>
  </Auth0Provider>,

  document.getElementById('root')
);
