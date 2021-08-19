/*global chrome*/

import './styles/TabsCard.css';
import Tab from './Tab';
import ChangeColor from './ChangeColor';

import { useState } from 'react';

function TabsCard({ tabGroup }) {
	let [minimized, setMinimized] = useState(false);
	let [palette, setPalette] = useState(false);

	const minimizeGroup = (/*element*/) => {
		// setMinimized(!minimized);
		// chrome.storage.local.get('storage', ({ storage }) => {
		// 	storage.openTabs.minimized = !storage.openTabs.minimized;
		// 	chrome.storage.local.set({ storage: storage });
		// });
	};

	const showPalette = () => {
		setPalette(!palette);
		console.log(palette);
	};

	const setColorPalette = (element) => {
		// const color = element.target.id;
		// chrome.storage.local.get('storage', ({ storage }) => {
		// 	storage.openTabs.color = color;
		// 	chrome.storage.local.set({ storage: storage });
		// });
	};

	const changeTitle = (el) => {
		chrome.storage.local.get('storage', ({ storage }) => {
			storage.tabGroups = storage.tabGroups.map((group) => {
				if (tabGroup.id == group.id) group.nameGroup = el.target.innerHTML;
				return group;
			});
			chrome.storage.local.set({ storage: storage });
		});
	};

	return (
		<div className={'tabs-card tabs-card-' + tabGroup.color}>
			<div className={'tabs-card__header tabs-card__header-' + tabGroup.color}>
				<h2
					className={'tabs-card__title text-' + tabGroup.color}
					contentEditable="true"
					onInput={changeTitle}
				>
					{tabGroup.nameGroup}
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
				{tabGroup.tabs &&
					tabGroup.tabs.map((tab) => (
						<Tab tab={tab} color={tabGroup.color} openTab={false} />
					))}
			</ul>
		</div>
	);
}

export default TabsCard;
