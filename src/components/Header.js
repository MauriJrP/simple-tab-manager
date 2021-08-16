/*global chrome*/
import './styles/Header.css';
// import { useState, useEffect } from 'react';

function Header() {
	return (
		<>
			<header className="header">
				<h1 className="header__h1">Tab Cleaner</h1>
				<div className="header__div-add img-container">
					<img
						src={process.env.PUBLIC_URL + '/icons/add.png'}
						alt="add"
						title="Add new group"
						className=""
					/>
				</div>
			</header>
		</>
	);
}

export default Header;
