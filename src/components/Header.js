/*global chrome*/
import './styles/Header.css';
import TabGroup from '../TabGroup';

function Header() {
	const addNewTabGroup = () => {
		chrome.storage.local.get('storage', ({ storage }) => {
			let date = new Date();
			let newTabGroup = new TabGroup(++storage.tabGroupsCont);
			newTabGroup.nameGroup = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
			storage.tabGroups.unshift(newTabGroup);
			chrome.storage.local.set({ storage: storage });
		});
	};

	return (
		<>
			<header className="header">
				<h1 className="header__h1">Tab Manager</h1>
				<div className="header__div-add img-container">
					<img
						src={process.env.PUBLIC_URL + '/icons/add.png'}
						alt="add"
						title="Add new group"
						className="header__img-add"
						onClick={addNewTabGroup}
					/>
				</div>
			</header>
		</>
	);
}

export default Header;
