import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './redux';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Routes />
        <ToastContainer />
      </GoogleOAuthProvider>
    </CookiesProvider>
  </Provider>,
  document.getElementById('root')
);
