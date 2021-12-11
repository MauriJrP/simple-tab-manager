import './styles/Main.css';
import OpenTabsCard from './OpenTabsCard';
import TabsCard from './TabsCard';

function Main({ openTabs, tabGroups }) {
	return (
		<main className="main">
			<OpenTabsCard openTabs={openTabs} />
			<div className="main__groups">
				{tabGroups &&
					tabGroups.map((tabGroup) => {
						return <TabsCard tabGroup={tabGroup} />;
					})}
			</div>
		</main>
	);
}

export default Main;
