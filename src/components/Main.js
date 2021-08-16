import './styles/Main.css';
import OpenTabsCard from './OpenTabsCard';
import TabsCard from './TabsCard';

function Main({ openTabs, tabGroups }) {
	return (
		<main className="main">
			<OpenTabsCard openTabs={openTabs} />
			{/* {tabGroups.map((tabGroup) => {
				<TabsCard tabGroup={tabGroup} />;
			})} */}
		</main>
	);
}

export default Main;
