/*global chrome*/

class TabGroup {
	constructor(
		pinned = false,
		minimized = false,
		color = 'basic',
		nameGroup = 'New Group',
		tabs = []
	) {
		this.pinned = pinned;
		this.minimized = minimized;
		this.color = color;
		this.nameGroup = nameGroup;
		this.tabs = tabs;
	}

	getTabInfo = (tab) => {
		return {
			tabId: tab.id,
			title: tab.title,
			url: tab.url,
			favIconUrl: tab.favIconUrl,
		};
	};

	pushTab = (tabInfo) => {
		this.tabs.push(tabInfo);
	};
}

const getTabInfo = (tab) => {
	return {
		tabId: tab.id,
		title: tab.title,
		url: tab.url,
		favIconUrl: tab.favIconUrl,
	};
};

const loadTabGroups = async () => {
	tabGroups = [];
	chrome.storage.local.set({ tabGroups: tabGroups });
	await loadTabs();
};

const loadTabs = async () => {
	const tabs = await getAllInWindow();
	let openTabs = new TabGroup();
	openTabs.nameGroup = 'Open Tabs';
	tabs.map((tab) => {
		openTabs.pushTab(openTabs.getTabInfo(tab));
	});
	chrome.storage.local.set({ openTabs: openTabs });
};

const tabAdded = async (tab) => {
	chrome.storage.local.get('openTabs', ({ openTabs }) => {
		const newTab = getTabInfo(tab);
		openTabs.tabs.push(newTab);
		chrome.storage.local.set({ openTabs: openTabs });
	});
};

const tabUpdated = async (tabId, changeInfo, tab) => {
	if (tab.status === 'complete') {
		chrome.storage.local.get('openTabs', ({ openTabs }) => {
			const pos = openTabs.tabs.findIndex((openTab) => openTab.tabId === tabId);
			openTabs.tabs[pos] = getTabInfo(tab);
			chrome.storage.local.set({ openTabs: openTabs });
		});
	}
};

const tabRemoved = async (tabId, removeInfo) => {
	chrome.storage.local.get('openTabs', ({ openTabs }) => {
		openTabs.tabs = openTabs.tabs.filter((openTab) => openTab.tabId !== tabId);
		chrome.storage.local.set({ openTabs: openTabs });
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
