import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppSelector from './AppSelector';
import reportWebVitals from './reportWebVitals';
import { LayerProvider } from './COPLib';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LayerProvider>
      <AppSelector />
    </LayerProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
