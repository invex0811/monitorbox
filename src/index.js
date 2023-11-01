import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "hover.css";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyCy37-VIORLTw-TYc-SkWgLitI9v95Qods",
  authDomain: "monitorbox-88b5b.firebaseapp.com",
  projectId: "monitorbox-88b5b",
  storageBucket: "monitorbox-88b5b.appspot.com",
  messagingSenderId: "180778580190",
  appId: "1:180778580190:web:757af0ea99b6ca44142a4f",
  measurementId: "G-YEENE3QMDG",
  databaseURL:
    "https://monitorbox-88b5b-default-rtdb.europe-west1.firebasedatabase.app",
});
getAuth(app);
getFirestore(app);
const root = ReactDOM.createRoot(document.getElementById("root"));

getAuth().onAuthStateChanged(() => {
  root.render(
    <React.StrictMode>
      <HashRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>
    </React.StrictMode>
  );
});
