/*global chrome*/

import './styles/TabsCard.css';
import Tab from './Tab';
import ChangeColor from './ChangeColor';

import { useState } from 'react';

function TabsCard({ openTabs }) {
	let [minimized, setMinimized] = useState(false);
	let [palette, setPalette] = useState(false);

	const minimizeGroup = (/*element*/) => {
		setMinimized(!minimized);
		chrome.storage.local.get('openTabs', ({ openTabs }) => {
			openTabs.minimized = !openTabs.minimized;
			chrome.storage.local.set({ openTabs: openTabs });
		});
	};

	const showPalette = () => {
		setPalette(!palette);
		console.log(palette);
	};

	const setColorPalette = (element) => {
		const color = element.target.id;
		chrome.storage.local.get('openTabs', ({ openTabs }) => {
			openTabs.color = color;
			chrome.storage.local.set({ openTabs: openTabs });
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
				id="tabs-card"
			>
				{openTabs.tabs &&
					openTabs.tabs.map((tab) => (
						<Tab tab={tab} color={openTabs.color} openTab={true} />
					))}
			</ul>
		</div>
	);
}

export default TabsCard;
