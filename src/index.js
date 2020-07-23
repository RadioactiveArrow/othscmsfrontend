import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import axios from 'axios'
import * as serviceWorker from './serviceWorker';

axios.defaults.baseURL = 'http://localhost/othscmsbackend/'; //TODO switch to URL from config.js or from dotenv
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
