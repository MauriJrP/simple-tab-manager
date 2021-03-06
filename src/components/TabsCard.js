/*global chrome*/

import './styles/TabsCard.css';
import TabGroup from '../TabGroup';
import Tab from './Tab';
import ChangeColor from './ChangeColor';

import { useState } from 'react';

function TabsCard({ tabGroup }) {
	let [minimized, setMinimized] = useState(tabGroup.minimized);
	let [hidden, setHidden] = useState(tabGroup.minimized);
	let [palette, setPalette] = useState(false);

	const deletGroup = () => {
		chrome.storage.local.get('storage', ({ storage }) => {
			storage.tabGroups = storage.tabGroups.filter(
				(group) => group.id !== tabGroup.id
			);
			chrome.storage.local.set({ storage: storage });
		});
	};

	const changeTitle = (el) => {
		chrome.storage.local.get('storage', ({ storage }) => {
			storage.tabGroups = storage.tabGroups.map((group) => {
				if (tabGroup.id === group.id)
					if (el.target.innerText !== '') group.nameGroup = el.target.innerText;
					else el.target.innerText = group.nameGroup;
				console.log(el);
				return group;
			});
			chrome.storage.local.set({ storage: storage });
		});
	};

	const showPalette = () => setPalette(!palette);

	const setColorPalette = (element) => {
		const color = element.target.id;
		chrome.storage.local.get('storage', ({ storage }) => {
			storage.tabGroups = storage.tabGroups.map((group) => {
				if (tabGroup.id === group.id) group.color = color;
				return group;
			});
			chrome.storage.local.set({ storage: storage });
		});
	};

	const createTab = async ({ url = undefined }) =>
		await chrome.tabs.create({ active: false, url: url });

	const getAllInWindow = async () => {
		let queryOptions = { windowId: -2 }; // -2 = windows.WINDOW_ID_CURRENT
		let tabs = await chrome.tabs.query(queryOptions);
		return tabs;
	};

	const reloadTabs = async () => {
		const tabs = await getAllInWindow();
		const myTabGroup = new TabGroup();

		chrome.storage.local.get('storage', ({ storage }) => {
			storage.openTabs.tabs = tabs.map((tab) =>
				myTabGroup.getTabInfo(tab, ++storage.tabsCont)
			);
			chrome.storage.local.set({ storage: storage });
		});
	};

	const restoreTabs = async () => {
		if (tabGroup.pinned) tabGroup.tabs.map(createTab);
		else {
			chrome.storage.local.get('storage', ({ storage }) => {
				tabGroup.tabs.map(createTab);
				storage.tabGroups = storage.tabGroups.filter(
					(group) => group.id !== tabGroup.id
				);
				chrome.storage.local.set({ storage: storage });
			});
			setTimeout(reloadTabs, 5000);
		}
	};

	const minimizeGroup = () => {
		if (hidden) setHidden(!hidden);
		else
			setTimeout(() => {
				setHidden(!hidden);
			}, 800);
		setMinimized(!minimized);
		chrome.storage.local.get('storage', ({ storage }) => {
			storage.tabGroups = storage.tabGroups.map((group) => {
				if (tabGroup.id === group.id) group.minimized = !group.minimized;
				return group;
			});
			chrome.storage.local.set({ storage: storage });
		});
	};

	const closeTab = async (id) => await chrome.tabs.remove(id);

	const removeTab = (storage) => {
		if (storage.tabTransfered.tabGroupId === 0) {
			storage.openTabs.tabs = storage.openTabs.tabs.filter(
				(tab) => tab.tabStorageId !== storage.tabTransfered.tabStorageId
			);
			closeTab(storage.tabTransfered.tabId);
		} else {
			const removePos = storage.tabGroups.findIndex(
				(tabGroup) => tabGroup.id === storage.tabTransfered.tabGroupId
			);
			storage.tabGroups[removePos].tabs = storage.tabGroups[
				removePos
			].tabs.filter(
				(tab) => tab.tabStorageId !== storage.tabTransfered.tabStorageId
			);
		}
	};

	const dragging = (el) => el.preventDefault();

	const drop = (el) => {
		el.preventDefault();
		chrome.storage.local.get('storage', ({ storage }) => {
			if (storage.tabTransfered.tabGroupId === tabGroup.id) return;
			removeTab(storage);
			storage.tabTransfered.tabGroupId = tabGroup.id;
			storage.tabGroups = storage.tabGroups.map((group) => {
				if (tabGroup.id === group.id) group.tabs.push(storage.tabTransfered);
				return group;
			});
			chrome.storage.local.set({ storage: storage });
		});
	};

	return (
		<div
			className={'tabs-card tabs-card-' + tabGroup.color}
			onDragOver={dragging}
			onDrop={drop}
			style={{ gridRow: 'span ' + tabGroup.tabs.length }}
		>
			<div
				className={
					'tabs-card__header tabs-card__header-' +
					tabGroup.color +
					(minimized || tabGroup.tabs.length === 0
						? ' tabs-card__header-minimize'
						: '')
				}
			>
				<div
					className="img-container tabs-card__img-container"
					title="Delete Group"
					onClick={deletGroup}
				>
					<img
						src={process.env.PUBLIC_URL + '/icons/cancel.png'}
						alt="delete"
						className="tabs-card__img"
					/>
				</div>
				<h2
					className={'tabs-card__title text-' + tabGroup.color}
					contentEditable="true"
					onBlur={changeTitle}
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
					title="Restore tabs"
					onClick={restoreTabs}
				>
					<img
						src={process.env.PUBLIC_URL + '/icons/restore.png'}
						className="tabs-card__img"
					/>
				</div>
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
					'tabs-card__ul ' +
					(minimized ? 'tabs-card__ul-minimize' : '') +
					(hidden ? ' hidden' : '')
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
