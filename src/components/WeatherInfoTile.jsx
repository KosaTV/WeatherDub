import React from "react";

const WeatherInfoTile = ({svg, label, value}) => {
	return (
		<div className="info__tile">
			<div className="img-section">{svg}</div>
			<div className="info-section">
				<h2 className="info-section__title">{label}</h2>
				<span className="info-section__value">{value}</span>
			</div>
		</div>
	);
};

export default WeatherInfoTile;
