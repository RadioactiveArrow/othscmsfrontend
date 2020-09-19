import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost/othscmsbackend/'; //TODO switch to URL from config.js or from dotenv
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
