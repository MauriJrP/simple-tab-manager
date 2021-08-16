/*global chrome*/

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
	chrome.storage.local.set({ tabGroups: tabGroups }, console.log(tabGroups));
	loadTabs();
};

const loadTabs = async () => {
	const tabs = await getAllInWindow();
	let openTabs = tabs.map((tab) => getTabInfo(tab));
	chrome.storage.local.set({ openTabs: openTabs });
	chrome.storage.local.set({ minimized: false });
};

const tabAdded = async (tab) => {
	chrome.storage.local.get('openTabs', ({ openTabs }) => {
		const newTab = getTabInfo(tab);
		openTabs.push(newTab);
		chrome.storage.local.set({ openTabs: openTabs });
	});
};

const tabUpdated = async (tabId, changeInfo, tab) => {
	if (tab.status === 'complete') {
		chrome.storage.local.get('openTabs', ({ openTabs }) => {
			const pos = openTabs.findIndex((openTab) => openTab.tabId === tabId);
			openTabs[pos] = getTabInfo(tab);
			chrome.storage.local.set({ openTabs: openTabs });
		});
	}
};

const tabRemoved = async (tabId, removeInfo) => {
	chrome.storage.local.get('openTabs', ({ openTabs }) => {
		openTabs = openTabs.filter((openTab) => openTab.tabId !== tabId);
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
