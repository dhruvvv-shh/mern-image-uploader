import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import {Provider} from "react-redux"
import {configureStore} from "@reduxjs/toolkit"	
import galleryReducer from "./components/Views/imageState";
import { ToastContainer } from 'react-toastify';

const store = configureStore({
    reducer: {
        gallery: galleryReducer
    }
})

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
		<Provider store={store}>
			<App />
			<ToastContainer/>
		</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
