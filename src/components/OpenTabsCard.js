/*global chrome*/

import './styles/TabsCard.css';
import TabGroup from '../TabGroup';
import Tab from './Tab';
import ChangeColor from './ChangeColor';

import { useState } from 'react';

function OpenTabsCard({ openTabs }) {
	let [palette, setPalette] = useState(false);

	// const minimizeGroup = () => {
	// 	if (hidden) setHidden(!hidden);
	// 	else
	// 		setTimeout(() => {
	// 			setHidden(!hidden);
	// 		}, 800);
	// 	setMinimized(!minimized);
	// 	chrome.storage.local.get('storage', ({ storage }) => {
	// 		storage.openTabs.minimized = !storage.openTabs.minimized;
	// 		chrome.storage.local.set({ storage: storage });
	// 	});
	// };

	const closeTab = async (id) => await chrome.tabs.remove(id);

	const saveTabsInNewGroup = () => {
		chrome.storage.local.get('storage', ({ storage }) => {
			let date = new Date();
			let newTabGroup = new TabGroup(++storage.tabGroupsCont);
			newTabGroup.nameGroup = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
			newTabGroup.tabs = storage.openTabs.tabs.filter((tab) => {
				if (!tab.pinned) {
					closeTab(tab.tabId);
					return tab;
				}
			});
			storage.tabGroups.unshift(newTabGroup);
			chrome.storage.local.set({ storage: storage });
		});
	};

	const showPalette = () => setPalette(!palette);

	const setColorPalette = (element) => {
		const color = element.target.id;
		chrome.storage.local.get('storage', ({ storage }) => {
			storage.openTabs.color = color;
			chrome.storage.local.set({ storage: storage });
		});
	};

	const createNewTab = async () => await chrome.tabs.create({ active: false });

	const createTab = async (url = undefined) =>
		await chrome.tabs.create({ active: false, url: url });

	const dragging = (el) => el.preventDefault();

	const drop = (el) => {
		el.preventDefault();
		chrome.storage.local.get('storage', ({ storage }) => {
			if (storage.tabTransfered.tabGroupId === openTabs.id) return;
			const removePos = storage.tabGroups.findIndex(
				(tabGroup) => tabGroup.id === storage.tabTransfered.tabGroupId
			);
			storage.tabGroups[removePos].tabs = storage.tabGroups[
				removePos
			].tabs.filter(
				(tab) => tab.tabStorageId !== storage.tabTransfered.tabStorageId
			);
			storage.tabTransfered.tabGroupId = openTabs.id;
			createTab(storage.tabTransfered.url);
			chrome.storage.local.set({ storage: storage });
		});
	};

	return (
		<div
			className={'tabs-card tabs-card-' + openTabs.color}
			onDragOver={dragging}
			onDrop={drop}
			style={{ gridRow: 'span ' + openTabs.tabs.length }}
		>
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
					title="Save all in new group"
					onClick={saveTabsInNewGroup}
				>
					<img
						src={process.env.PUBLIC_URL + '/icons/save.png'}
						className="tabs-card__img"
					/>
				</div>
			</div>
			<ul className="tabs-card__ul">
				{openTabs.tabs &&
					openTabs.tabs.map((tab) => (
						<Tab tab={tab} color={openTabs.color} openTab={true} />
					))}
				<li
					className={'tabs-card__li tab tabs-card__header-' + openTabs.color}
					title="New Tab"
					onClick={createNewTab}
				>
					<p className={'tab__a tabs-card__title text-' + openTabs.color}>
						Create New Tab
					</p>
				</li>
			</ul>
		</div>
	);
}

export default OpenTabsCard;
