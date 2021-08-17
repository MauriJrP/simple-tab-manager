/*global chrome*/

import './styles/Tab.css';

function Tab({ tab, color, openTab }) {
	const removeTab = async () => await chrome.tabs.remove(tab.tabId);

	const linkInfo = (
		<div className="tabs-card__img-container img-container tab__img-container-fav-icon">
			<img
				src={
					tab.favIconUrl != '' && tab.favIconUrl !== undefined
						? tab.favIconUrl
						: 'https://image.flaticon.com/icons/png/512/1179/1179237.png'
				}
				alt=""
				className="tabs-card__img "
			/>
		</div>
	);

	const link = openTab ? (
		<a href={tab.url} target="_blank" className={'tab__a text-' + color}>
			{linkInfo}
			{tab.title.substring(0, 20)}
		</a>
	) : (
		<div className={'tab__a text-' + color}>
			{linkInfo}
			{tab.title.substring(0, 20)}
		</div>
	);

	return (
		<li className={'tabs-card__li tab tab-' + color} title={tab.title}>
			{link}
			<div
				className="tabs-card__img-container img-container tab__img-container-close-icon"
				id={tab.tabId}
				onClick={removeTab}
			>
				<img
					src={process.env.PUBLIC_URL + '/icons/cancel.png'}
					title="Close"
					className="tabs-card__img"
				/>
			</div>
		</li>
	);
}

export default Tab;
