import {nanoid} from "nanoid";
import React from "react";
import {useOptions} from "../contexts/OptionsProvider";
import {useWeather} from "../contexts/WeatherProvider";

const MainCityTab = ({className}) => {
	const OptionsProvider = useOptions();
	const WeatherContext = useWeather();

	const selectClickedCity = e => {
		const city = e.target.closest(".cities-list__city");
		if (!city) return;
		const value = city.textContent;
		WeatherContext.setStartCity(JSON.stringify(value));
	};

	return (
		<section className={className}>
			<header className="tab-header">
				<button onClick={e => OptionsProvider.setTabContentId(null)} className="tab-header__button">
					<svg className="svg" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							className="svg__path"
							d="M6.83 15.9999C6.6806 16.0005 6.53299 15.9653 6.39801 15.897C6.26303 15.8287 6.14411 15.729 6.05 15.6053L1.22 9.20529C1.07291 9.01443 0.992508 8.77502 0.992508 8.52796C0.992508 8.28089 1.07291 8.04149 1.22 7.85063L6.22 1.45066C6.38973 1.23283 6.63365 1.09584 6.89807 1.06984C7.1625 1.04383 7.42578 1.13094 7.63 1.31199C7.83421 1.49304 7.96264 1.75322 7.98702 2.03527C8.0114 2.31732 7.92973 2.59815 7.76 2.81598L3.29 8.53329L7.61 14.2506C7.73228 14.4072 7.80996 14.5978 7.83384 14.8C7.85771 15.0022 7.8268 15.2074 7.74474 15.3915C7.66269 15.5755 7.53293 15.7306 7.37082 15.8384C7.20871 15.9463 7.02103 16.0023 6.83 15.9999Z"
							fill="black"
						/>
					</svg>
				</button>
				<h1 className="tab-header__h1">Select City</h1>
			</header>
			<div className="cities-list" onClick={selectClickedCity}>
				{JSON.parse(WeatherContext.citiesCollection) ? (
					JSON.parse(WeatherContext.citiesCollection).map(city => (
						<div key={nanoid()} className="cities-list__city">
							{city}
							<svg className="svg" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M0.227295 5.00001C0.227295 7.63114 2.3682 9.77274 5.00002 9.77274C7.63116 9.77274 9.77275 7.63114 9.77275 5.00001C9.77275 2.36887 7.63116 0.22728 5.00002 0.22728C2.3682 0.22728 0.227295 2.36887 0.227295 5.00001ZM8.40911 5.00001C8.40911 6.87978 6.8798 8.4091 5.00002 8.4091C3.12025 8.4091 1.59093 6.87978 1.59093 5.00001C1.59093 3.12023 3.12025 1.59092 5.00002 1.59092C6.8798 1.59092 8.40911 3.12023 8.40911 5.00001Z"
									fill="white"
								/>

								{WeatherContext.startCity && JSON.parse(WeatherContext.startCity) === city && <circle cx="5" cy="5" r="2" fill="white" />}
							</svg>
						</div>
					))
				) : (
					<>
						<span className="section-placeholder">There's nothing yet </span>
						<span className="section-placeholder">☁️</span>
					</>
				)}
			</div>
		</section>
	);
};

export default MainCityTab;
