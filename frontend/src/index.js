import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "common/store";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import GlobalStyle from "common/styles/global";
import initHttp from "common/http";
import "normalize.css/normalize.css";
import "font.css";

initHttp();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
