/*global chrome*/
import './styles/App.css';
import { useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
	let [storage, setStroage] = useState({});

	chrome.storage.local.get('storage', ({ storage }) => {
		setStroage(storage);
	});
	// console.log(storage);

	return (
		<div className="container">
			<Header />
			{storage.openTabs && storage.tabGroups && (
				<Main openTabs={storage.openTabs} tabGroups={storage.tabGroups} />
			)}
			<Footer />
		</div>
	);
}

export default App;
