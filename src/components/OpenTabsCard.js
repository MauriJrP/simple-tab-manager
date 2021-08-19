/*global chrome*/

import './styles/TabsCard.css';
import Tab from './Tab';
import ChangeColor from './ChangeColor';

import { useState } from 'react';

function OpenTabsCard({ openTabs }) {
	let [minimized, setMinimized] = useState(false);
	let [palette, setPalette] = useState(false);

	const minimizeGroup = (/*element*/) => {
		setMinimized(!minimized);
		chrome.storage.local.get('storage', ({ storage }) => {
			storage.openTabs.minimized = !storage.openTabs.minimized;
			chrome.storage.local.set({ storage: storage });
		});
	};

	const showPalette = () => {
		setPalette(!palette);
		console.log(palette);
	};

	const setColorPalette = (element) => {
		const color = element.target.id;
		chrome.storage.local.get('storage', ({ storage }) => {
			storage.openTabs.color = color;
			chrome.storage.local.set({ storage: storage });
		});
	};

	return (
		<div className={'tabs-card tabs-card-' + openTabs.color}>
			<div className={'tabs-card__header tabs-card__header-' + openTabs.color}>
				<h2 className={'tabs-card__title text-' + openTabs.color}>
					{openTabs.nameGroup}
				</h2>
				<ChangeColor
					showPalette={showPalette}
					palette={palette}
					setColorPalette={setColorPalette}
				/>
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
				{openTabs.tabs &&
					openTabs.tabs.map((tab) => (
						<Tab tab={tab} color={openTabs.color} openTab={true} />
					))}
			</ul>
		</div>
	);
}

export default OpenTabsCard;
