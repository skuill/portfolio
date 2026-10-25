import React from 'react';
import ReactDOM from 'react-dom/client';
import "./scss/custom.scss";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const packageJson = require("../package.json");
console.log("Website version:", packageJson.version);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
