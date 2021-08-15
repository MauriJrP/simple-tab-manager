/*global chrome*/

import './styles/TabsCard.css';
import Tab from './Tab';

import { useState } from 'react';

function TabsCard({ openTabs }) {
	let [minimized, setMinimized] = useState();

	const minimizeGroup = (element) => {
		setMinimized(!minimized);
		chrome.storage.local.set({ minimized: !minimized });
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
				id="tabs-card"
			>
				{openTabs.map((openTab) => (
					<Tab openTab={openTab} />
				))}
			</ul>
		</div>
	);
}

export default TabsCard;
