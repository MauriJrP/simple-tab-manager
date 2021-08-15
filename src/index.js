import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import App from './components/App';

// let changeColor = document.getElementById('changeColor');

// chrome.storage.sync.get('color', ({ color }) => {
// 	changeColor.style.backgroundColor = color;
// });

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
