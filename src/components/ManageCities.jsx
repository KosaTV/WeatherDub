import {nanoid} from "nanoid";
import React from "react";
import {useOptions} from "../contexts/OptionsProvider";
import {useWeather} from "../contexts/WeatherProvider";

const ManageCities = ({className, searchCity}) => {
	const OptionsProvider = useOptions();
	const WeatherContext = useWeather();

	const handleClickedCity = e => {
		const city = e.target.closest(".cities-list__city");
		const isTrash = e.target.closest(".delete-section");
		if (!city) return;
		const value = city.textContent;
		if (isTrash) {
			const filteredCities = JSON.parse(WeatherContext.citiesCollection).filter(city => city !== value);
			WeatherContext.setCitiesCollection(JSON.stringify(filteredCities));
			return;
		}

		searchCity(value);
		OptionsProvider.setTabContentId(null);
		OptionsProvider.setOpenMenu(false);
	};

	return (
		<section className={className}>
			<header className="tab-header">
				<button
					onClick={e => {
						OptionsProvider.setTabContentId(null);
					}}
					className="tab-header__button"
				>
					<svg className="svg" width="8" height="16" viewBox="0 0 8 16" fill="white" xmlns="http://www.w3.org/2000/svg">
						<path
							className="svg__path"
							d="M6.83 15.9999C6.6806 16.0005 6.53299 15.9653 6.39801 15.897C6.26303 15.8287 6.14411 15.729 6.05 15.6053L1.22 9.20529C1.07291 9.01443 0.992508 8.77502 0.992508 8.52796C0.992508 8.28089 1.07291 8.04149 1.22 7.85063L6.22 1.45066C6.38973 1.23283 6.63365 1.09584 6.89807 1.06984C7.1625 1.04383 7.42578 1.13094 7.63 1.31199C7.83421 1.49304 7.96264 1.75322 7.98702 2.03527C8.0114 2.31732 7.92973 2.59815 7.76 2.81598L3.29 8.53329L7.61 14.2506C7.73228 14.4072 7.80996 14.5978 7.83384 14.8C7.85771 15.0022 7.8268 15.2074 7.74474 15.3915C7.66269 15.5755 7.53293 15.7306 7.37082 15.8384C7.20871 15.9463 7.02103 16.0023 6.83 15.9999Z"
							fill="white"
						/>
					</svg>
				</button>
				<h1 className="tab-header__h1">Manage Cities</h1>
			</header>
			<div className="cities-list" onClick={handleClickedCity}>
				{JSON.parse(WeatherContext.citiesCollection) ? (
					JSON.parse(WeatherContext.citiesCollection).map(city => (
						<div key={nanoid()} className="cities-list__city">
							{city}
							<div className="delete-section">
								<button className="delete-section__button">
									<svg className="svg cities-list__trash" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M8.54058 1.28572C9.08915 1.28567 9.61685 1.49601 10.015 1.8734C10.4131 2.2508 10.6513 2.7665 10.6806 3.31429L10.6834 3.42858H13.8263C13.9349 3.42861 14.0394 3.46986 14.1187 3.54399C14.1981 3.61812 14.2463 3.71961 14.2537 3.82794C14.2611 3.93627 14.2271 4.04337 14.1586 4.12761C14.0901 4.21184 13.9922 4.26692 13.8846 4.28172L13.8263 4.28572H13.2212L12.524 12.8874C12.4805 13.424 12.2366 13.9246 11.8408 14.2896C11.445 14.6546 10.9264 14.8572 10.388 14.8571H6.69315C6.15478 14.8572 5.63611 14.6546 5.24033 14.2896C4.84455 13.9246 4.60065 13.424 4.55715 12.8874L3.85944 4.28572H3.25487C3.1513 4.28572 3.05124 4.24821 2.97319 4.18014C2.89514 4.11207 2.84438 4.01804 2.83029 3.91544L2.82629 3.85715C2.8263 3.75358 2.8638 3.65353 2.93188 3.57547C2.99995 3.49742 3.09398 3.44666 3.19658 3.43258L3.25487 3.42858H6.39772C6.39772 2.86026 6.62349 2.31521 7.02535 1.91335C7.42721 1.51149 7.97226 1.28572 8.54058 1.28572V1.28572ZM12.3617 4.28572H4.71944L5.41144 12.8183C5.43757 13.1403 5.58393 13.4406 5.82142 13.6596C6.05891 13.8785 6.37013 14.0001 6.69315 14H10.388C10.711 14.0001 11.0222 13.8785 11.2597 13.6596C11.4972 13.4406 11.6436 13.1403 11.6697 12.8183L12.3612 4.28572H12.3617ZM7.25487 6.42858C7.35843 6.42858 7.45849 6.46609 7.53654 6.53416C7.61459 6.60223 7.66535 6.69626 7.67944 6.79886L7.68344 6.85715V11.4286C7.6834 11.5372 7.64215 11.6417 7.56802 11.721C7.49389 11.8004 7.39241 11.8486 7.28408 11.856C7.17574 11.8634 7.06864 11.8294 6.98441 11.7609C6.90018 11.6924 6.84509 11.5944 6.83029 11.4869L6.82629 11.4286V6.85715C6.82629 6.74348 6.87145 6.63448 6.95182 6.5541C7.03219 6.47373 7.1412 6.42858 7.25487 6.42858V6.42858ZM9.82629 6.42858C9.92986 6.42858 10.0299 6.46609 10.108 6.53416C10.186 6.60223 10.2368 6.69626 10.2509 6.79886L10.2549 6.85715V11.4286C10.2548 11.5372 10.2136 11.6417 10.1395 11.721C10.0653 11.8004 9.96384 11.8486 9.85551 11.856C9.74717 11.8634 9.64007 11.8294 9.55584 11.7609C9.47161 11.6924 9.41652 11.5944 9.40172 11.4869L9.39772 11.4286V6.85715C9.39772 6.74348 9.44288 6.63448 9.52325 6.5541C9.60362 6.47373 9.71263 6.42858 9.82629 6.42858ZM8.54058 2.14286C8.21479 2.14282 7.90114 2.26646 7.66301 2.48879C7.42487 2.71112 7.28002 3.01556 7.25772 3.34058L7.25487 3.42858H9.82629L9.82344 3.34058C9.80114 3.01556 9.65629 2.71112 9.41815 2.48879C9.18002 2.26646 8.86637 2.14282 8.54058 2.14286V2.14286Z"
											fill="white"
										/>
									</svg>
								</button>
							</div>
						</div>
					))
				) : (
					<>
						<span className="section-placeholder">There's nothing yet </span>
						<span className="section-placeholder">☁️</span>
					</>
				)}
			</div>
			<div className="cities-options">
				<button
					onClick={e => {
						OptionsProvider.setCityPopupToggle(true);
					}}
					className="option-button cities-options__button"
				>
					<svg className="svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path className="svg__path" d="M7.75 2.75V12.75M12.75 7.75H2.75H12.75Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>
			</div>
		</section>
	);
};

export default ManageCities;
