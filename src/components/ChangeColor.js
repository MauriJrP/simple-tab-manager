function ChangeColor({ onClick }) {
	return (
		<div
			className="img-container tabs-card__img-container"
			title="Change color"
			onClick={onClick}
		>
			<img
				src={process.env.PUBLIC_URL + '/icons/color-palette.png'}
				className="tabs-card__img"
			/>
		</div>
	);
}

export default ChangeColor;
