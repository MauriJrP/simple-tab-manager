/*global chrome*/
import './styles/App.css';
import { useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
	let [openTabs, setOpenTabs] = useState([]);
	let [tabGroups, setTabGroups] = useState([]);

	chrome.storage.local.get('openTabs', ({ openTabs }) => setOpenTabs(openTabs));
	chrome.storage.local.get('tabGroups', ({ tabGroups }) =>
		setTabGroups(tabGroups)
	);

	return (
		<div className="container">
			<Header />
			<Main openTabs={openTabs} tabGroups={tabGroups} />
			<Footer />
		</div>
	);
}

export default App;
