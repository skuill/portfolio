import React from 'react';
import ReactDOM from 'react-dom/client';
import "@fontsource/big-shoulders-display/latin-700";
import "@fontsource/golos-text/latin-400";
import "@fontsource/golos-text/latin-500";
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
