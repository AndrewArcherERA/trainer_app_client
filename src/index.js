import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./Theme";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
