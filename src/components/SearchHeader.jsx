import React, {useEffect, useState, useRef} from "react";

import {months, addZeroForClock} from "../helpers/date";
import setErrorText from "../helpers/errors";

import ModalToPage from "./ModalToPage";
import {useOptions} from "../contexts/OptionsProvider";
import {useWeather} from "../contexts/WeatherProvider";

import CityPopup from "./CityPopup";

const SearchHeader = React.forwardRef(({className, roundTemperature, searchCity, currentWeather, getWeatherCondition, handleWeatherBackground, setTimeOfDay}, ref) => {
	const [weatherInputValue, setWeatherInputValue] = useState("");
	const [currentWeatherImg, setCurrentWeatherImg] = useState("");
	const [temperature, setTemperature] = useState("");
	const [date, setDate] = useState(undefined);
	const requestDateAnimationRef = useRef("");
	const OptionsProvider = useOptions();
	const WeatherProvider = useWeather();

	useEffect(() => {
		requestDateAnimationRef.current = requestAnimationFrame(getDate);
		return () => cancelAnimationFrame(requestDateAnimationRef.current);
	}, []);

	useEffect(() => {
		if (OptionsProvider.cityPopupToggle) setWeatherInputValue(`${currentWeather.name}, ${currentWeather.sys.country.name}`);
	}, [OptionsProvider.cityPopupToggle]);

	const getDate = () => {
		let dateLabel = "Welcome !";
		const now = new Date();
		const currentDay = now.getDate();
		const currentMonth = now.getMonth();
		const hours = now.getHours();
		const minutes = now.getMinutes();
		const textMonth = months[currentMonth].substr(0, 3);
		dateLabel = `Today, ${textMonth} ${currentDay} ${addZeroForClock(hours)}:${addZeroForClock(minutes)}`;
		setDate(dateLabel);
		requestDateAnimationRef.current = requestAnimationFrame(getDate);
	};

	const getImg = async () => {
		const img = await getWeatherCondition(currentWeather);
		setCurrentWeatherImg(img);
	};

	useEffect(() => {
		if (Object.entries(currentWeather).length) {
			getImg();
			setTemperature(roundTemperature(currentWeather.main.temp));
			handleWeatherBackground(currentWeather);
		}
	}, [currentWeather]);

	const getCityName = async e => {
		const result = await WeatherProvider.getOneCityWeatherData(weatherInputValue);
		if (result.response && result.response.status !== 200) return {error: setErrorText(result.response.status)};
		return result.name;
	};

	const addCityToCollection = () => {
		if (JSON.parse(WeatherProvider.citiesCollection)) {
			const newCities = [...new Set([...JSON.parse(WeatherProvider.citiesCollection), weatherInputValue])];
			WeatherProvider.setCitiesCollection(JSON.stringify(newCities));
		} else WeatherProvider.setCitiesCollection(JSON.stringify([weatherInputValue]));
	};

	return (
		<header className={className} ref={ref}>
			{Object.entries(currentWeather).length && (
				<section className="weather-info">
					<header className="weather-info__header">
						{OptionsProvider.cityPopupToggle && (
							<ModalToPage
								setOpen={OptionsProvider.setCityPopupToggle}
								Popup={{Component: CityPopup, values: {type: "add", getCityName, cb: addCityToCollection, value: weatherInputValue, setInputValue: setWeatherInputValue}}}
							/>
						)}
						{OptionsProvider.searchCityPopupToggle && (
							<ModalToPage
								setOpen={OptionsProvider.setSearchCityPopupToggle}
								Popup={{
									Component: CityPopup,
									values: {type: "find", getCityName, cb: () => searchCity(weatherInputValue), value: weatherInputValue, setInputValue: setWeatherInputValue}
								}}
							/>
						)}
						<div className="text-info">
							<div className="text-info__city-info">
								{currentWeather.name}, {currentWeather.sys.country.name}
							</div>
							<div className="text-info__date">{date}</div>
						</div>

						<div className="options">
							<button
								onClick={e => {
									OptionsProvider.setCityPopupToggle(true);
								}}
								aria-label="Add city"
								className="options__button options__button--add-city"
							>
								<svg className="svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path className="svg__path" d="M7.75 2.75V12.75M12.75 7.75H2.75H12.75Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</button>

							<button
								onClick={e => {
									OptionsProvider.setOpenMenu(true);
								}}
								aria-label="Open menu"
								className="options__button options__button--hamburger-menu"
							>
								<svg className="svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										className="svg__path"
										d="M9 4H13.3333M2.66667 8H13.3333M8.66667 12H13.3333"
										stroke="white"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
					</header>
					<div className="content">
						<div className="condition">
							<span className="condition__img">{currentWeatherImg}</span>
							<span className="condition__desc">{currentWeather.weather[0].description}</span>
						</div>

						<div className="temperature">
							<span className="temperature__temp">{temperature}</span>
							<span className="temperature__unit ">°</span>
						</div>
					</div>
				</section>
			)}
		</header>
	);
});

export default SearchHeader;
