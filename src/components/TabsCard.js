/*global chrome*/

import './styles/TabsCard.css';
import Tab from './Tab';
import ChangeColor from './ChangeColor';

import { useState } from 'react';

function TabsCard({ openTabs }) {
	let [minimized, setMinimized] = useState(false);
	let [palette, setPalette] = useState(false);

	const minimizeGroup = (element) => {
		setMinimized(!minimized);
		chrome.storage.local.get('openTabs', ({ openTabs }) => {
			openTabs.minimized = !openTabs.minimized;
			chrome.storage.local.set({ openTabs: openTabs });
		});
	};

	const changePalette = () => {
		setPalette(!palette);
		console.log(palette);
	};

	return (
		<div className={'tabs-card tabs-card-' + openTabs.color}>
			<div className={'tabs-card__header tabs-card__header-' + openTabs.color}>
				<h2 className={'tabs-card__title text-' + openTabs.color}>
					{openTabs.nameGroup}
				</h2>
				<ChangeColor onClick={() => changePalette()} />
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
				{openTabs.tabs &&
					openTabs.tabs.map((tab) => <Tab tab={tab} color={openTabs.color} />)}
			</ul>
		</div>
	);
}

export default TabsCard;
