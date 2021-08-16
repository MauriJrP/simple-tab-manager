/*global chrome*/

import './styles/TabsCard.css';
import OpenTab from './OpenTab';

import { useState } from 'react';

function OpenTabsCard({ openTabs }) {
	const saveTabs = (element) => {};

	return (
		<div className="tabs-card">
			<div className="tabs-card__header">
				<h2 className="tabs-card__title">Open Tabs</h2>
				<div
					className="img-container tabs-card__img-container"
					title="Save in new group"
					onClick={saveTabs}
				>
					<img
						src={process.env.PUBLIC_URL + '/icons/add.png'}
						className="tabs-card__img"
					/>
				</div>
			</div>
			<ul className="tabs-card__ul ">
				{openTabs.map((openTab) => (
					<OpenTab openTab={openTab} />
				))}
			</ul>
		</div>
	);
}

export default OpenTabsCard;
