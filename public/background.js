/*global chrome*/

class TabGroup {
	constructor(
		id = 0,
		pinned = false,
		minimized = false,
		color = 'basic',
		nameGroup = 'New Group',
		tabs = []
	) {
		this.id = id;
		this.pinned = pinned;
		this.minimized = minimized;
		this.color = color;
		this.nameGroup = nameGroup;
		this.tabs = tabs;
	}

	getTabInfo = (tab, id, groupId = 0) => {
		return {
			tabStorageId: id,
			tabGroupId: groupId,
			tabId: tab.id,
			title: tab.title,
			pinned: tab.pinned,
			url: tab.url,
			favIconUrl: tab.favIconUrl,
		};
	};

	pushTab = (tabInfo) => {
		this.tabs.push(tabInfo);
	};
}

const getTabInfo = (tab, id, groupId = 0) => {
	return {
		tabStorageId: id,
		tabGroupId: groupId,
		tabId: tab.id,
		title: tab.title,
		pinned: tab.pinned,
		url: tab.url,
		favIconUrl: tab.favIconUrl,
	};
};

const loadTabGroups = async () => {
	let storage = {
		tabGroups: [],
		tabGroupsCont: 0,
		tabsCont: 0,
		tabTransfered: undefined,
	};
	chrome.storage.local.set({ storage: storage });
	await loadTabs();
};

const loadTabs = async () => {
	const tabs = await getAllInWindow();
	console.log(tabs);

	chrome.storage.local.get('storage', ({ storage }) => {
		let openTabs = new TabGroup();
		openTabs.nameGroup = 'Open Tabs';
		tabs.map((tab) => {
			openTabs.pushTab(openTabs.getTabInfo(tab, ++storage.tabsCont));
		});
		storage.openTabs = openTabs;
		chrome.storage.local.set({ storage: storage });
	});
};

const tabAdded = async (tab) => {
	chrome.storage.local.get('storage', ({ storage }) => {
		const newTab = getTabInfo(tab, ++storage.tabsCont);
		console.log(newTab);
		storage.openTabs.tabs.push(newTab);
		console.log(storage.openTabs.tabs);
		chrome.storage.local.set({ storage: storage });
	});
};

const tabUpdated = async (tabId, changeInfo, tab) => {
	if (tab.status === 'complete') {
		chrome.storage.local.get('storage', ({ storage }) => {
			const pos = storage.openTabs.tabs.findIndex(
				(openTab) => openTab.tabId === tabId
			);
			storage.openTabs.tabs[pos] = getTabInfo(
				tab,
				storage.openTabs.tabs[pos].tabStorageId
			);
			chrome.storage.local.set({ storage: storage });
		});
	}
};

const tabRemoved = async (tabId, removeInfo) => {
	chrome.storage.local.get('storage', ({ storage }) => {
		storage.openTabs.tabs = storage.openTabs.tabs.filter(
			(openTab) => openTab.tabId !== tabId
		);
		chrome.storage.local.set({ storage: storage });
	});
};

async function getAllInWindow() {
	let queryOptions = { windowId: -2 }; // -2 = windows.WINDOW_ID_CURRENT
	let tabs = await chrome.tabs.query(queryOptions);
	return tabs;
}

async function getCurrentTab() {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

chrome.runtime.onInstalled.addListener(loadTabGroups);
chrome.runtime.onStartup.addListener(loadTabs);
chrome.tabs.onCreated.addListener(tabAdded);
chrome.tabs.onUpdated.addListener(tabUpdated);
chrome.tabs.onRemoved.addListener(tabRemoved);
