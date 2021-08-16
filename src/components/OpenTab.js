/*global chrome*/

import './styles/Tab.css';

function OpenTab({ openTab }) {
	const removeTab = async () => await chrome.tabs.remove(openTab.tabId);

	return (
		<li className="tabs-card__li tab" title={openTab.title}>
			<a href={openTab.url} target="_blank" className="tab__a">
				<div className="tabs-card__img-container img-container tab__img-container-fav-icon">
					<img
						src={
							openTab.favIconUrl != '' && openTab.favIconUrl !== undefined
								? openTab.favIconUrl
								: 'https://image.flaticon.com/icons/png/512/1179/1179237.png'
						}
						alt=""
						className="tabs-card__img "
					/>
				</div>
				<p>{openTab.title.substring(0, 20)}</p>
			</a>
			<div
				className="tabs-card__img-container img-container tab__img-container-close-icon"
				id={openTab.tabId}
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

export default OpenTab;
