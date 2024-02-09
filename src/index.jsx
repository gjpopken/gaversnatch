import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Tailwind from 'primereact/passthrough/tailwind';

import store from './redux/store';

import App from './components/App/App';

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';



const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(
  <React.StrictMode>
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
      <Provider store={store}>
        <App />
      </Provider>
    </PrimeReactProvider>

  </React.StrictMode>
);
