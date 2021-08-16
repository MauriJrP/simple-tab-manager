/*global chrome*/
import './styles/App.css';
import { useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
	let [openTabs, setOpenTabs] = useState([]);

	chrome.storage.local.get('openTabs', ({ openTabs }) => setOpenTabs(openTabs));
	// console.log(openTabs);

	return (
		<div className="container">
			<Header />
			<Main openTabs={openTabs} />
			<Footer />
		</div>
	);
}

export default App;
