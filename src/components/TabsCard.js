/*global chrome*/

import './styles/TabsCard.css';
import Tab from './Tab';

import { useState } from 'react';

function TabsCard({ tabGroup }) {
	let [minimized, setMinimized] = useState();

	const minimizeGroup = (element) => {
		setMinimized(!minimized);

		// chrome.storage.local.set({ minimized: !minimized });
		// chrome.storage.local.get('test', (test) => console.log(test));
		// chrome.storage.local.get('openTabs', (openTabs) => console.log(openTabs));
	};

	return (
		<div className="tabs-card">
			<div className="tabs-card__header">
				<h2 className="tabs-card__title">Open Tabs</h2>
				<div
					className="img-container tabs-card__img-container"
					title="Minimize"
					onClick={minimizeGroup}
				>
					<img
						src={process.env.PUBLIC_URL + '/icons/minimize.png'}
						className="tabs-card__img"
					/>
				</div>
			</div>
			<ul
				className={
					'tabs-card__ul ' + (minimized ? 'tabs-card__ul-minimize' : '')
				}
			>
				{tabGroup.tabs.map((tab) => (
					<Tab tab={tab} />
				))}
			</ul>
		</div>
	);
}

export default TabsCard;
