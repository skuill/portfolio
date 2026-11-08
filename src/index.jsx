import React from 'react';
import ReactDOM from 'react-dom/client';
import "./scss/custom.scss";
import App from './App';
import { version } from "../package.json";

const root = ReactDOM.createRoot(document.getElementById('root'));

console.log("Website version:", version);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
