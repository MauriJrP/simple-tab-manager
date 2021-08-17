/*global chrome*/

function ChangeColor({ showPalette, palette, setColorPalette }) {
	return (
		<div
			className="img-container tabs-card__img-container tabs-card__color-palette"
			title="Change color"
			onClick={showPalette}
		>
			<img
				src={process.env.PUBLIC_URL + '/icons/color-palette.png'}
				className="tabs-card__img"
			/>
			{palette && (
				<div className="color-palette">
					<div
						className="color-palette__div color-palette__basic"
						id="basic"
						onClick={setColorPalette}
					></div>
					<div
						className="color-palette__div color-palette__pink"
						id="pink"
						onClick={setColorPalette}
					></div>
					<div
						className="color-palette__div color-palette__yellow"
						id="yellow"
						onClick={setColorPalette}
					></div>
				</div>
			)}
		</div>
	);
}

export default ChangeColor;
