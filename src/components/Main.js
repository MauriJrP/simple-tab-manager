import './styles/Main.css';
import TabsCard from './TabsCard';

function Main({ openTabs }) {
	return (
		<main className="main">
			<TabsCard openTabs={openTabs} />
		</main>
	);
}

export default Main;
