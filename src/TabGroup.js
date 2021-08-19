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
			url: tab.url,
			favIconUrl: tab.favIconUrl,
		};
	};

	pushTab = (tabInfo) => {
		this.tabs.push(tabInfo);
	};
}

export default TabGroup;
