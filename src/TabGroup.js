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

export default TabGroup;