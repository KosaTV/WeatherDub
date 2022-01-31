import React, {useState, useEffect} from "react";
import {days} from "../helpers/date";
import {addZeroForClock} from "../helpers/date";

const DayTile = ({className, weatherInfo, getWeatherCondition, type = "day"}) => {
	const [currentWeatherImg, setCurrentWeatherImg] = useState("");

	const date = new Date(weatherInfo.dt * 1000);

	const getImg = async () => {
		const img = await getWeatherCondition(weatherInfo);
		setCurrentWeatherImg(img);
	};

	useEffect(() => {
		const fetchBusinesses = () => {
			getImg();
		};
		fetchBusinesses();
	});

	const getWeatherConditionInfo = () => {
		return weatherInfo.weather[0].description;
	};

	return (
		<li className={className}>
			<h2 className={`${className}__weather-day`}>{type === "day" ? days[date.getDay()] : `${addZeroForClock(date.getHours())}:${addZeroForClock(date.getMinutes())}`}</h2>
			<h2 className={`${className}__weather-day ${className}__weather-day--shortened`}>
				{type === "day" ? days[date.getDay()].substring(0, 3) : `${addZeroForClock(date.getHours())}:${addZeroForClock(date.getMinutes())}`}
			</h2>
			<div className="visual">{currentWeatherImg}</div>
			<div className="temps">
				{type === "hour" ? (
					<>
						<p className={`${className}__description`}>{getWeatherConditionInfo()}</p>
						<p className="temps__temp temps__temp--night">{Math.round(weatherInfo.temp)}</p>
					</>
				) : (
					<>
						<p className="temps__temp temps__temp--morning">{Math.round(weatherInfo.temp.morn)}</p>
						<p className="temps__temp temps__temp--night">{Math.round(weatherInfo.temp.night)}</p>
					</>
				)}
			</div>
		</li>
	);
};

export default DayTile;
