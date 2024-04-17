import React from 'react';
import { Provider } from "mobx-react";

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import WelcomePage from './pages/WelcomePage';
// import { AuthStore } from './stores/AuthStore';
// import { AuctionStore } from './stores/AuctionStore';
// import { OverlayStore } from './stores/OverlayStore';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          // audience: `https://${domain}/api/v2/`,
          // scope: "read:current_user update:current_user_metadata read:resource"
        }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
