import React, {useRef, useEffect, useState, useReducer} from "react";
import StyledSearchHeader from "./styled/SearchHeader.styled";
import StyledForecastSection from "./styled/ForecastSection.styled";
import StyledLoader from "./styled/Loader.styled";
import countries from "../helpers/countries";
import {useWeather} from "../contexts/WeatherProvider";
import {useOptions} from "../contexts/OptionsProvider";
import StyledNavigation from "./styled/Navigation.styled";
import ModalToPage from "./ModalToPage";
import navigationTabsStructure from "../utils/tabsData";
import setErrorText from "../helpers/errors";
import {getSeasonDays, getDaysSinceYear} from "../helpers/date";

const WeatherInfoActions = {
	CITY_NAME: "setCityName",
	WEATHER_CURRENT: "setCurrentWeather",
	WEATHER_FORECAST: "setForecast"
};

const WeatherCnt = ({className}) => {
	//* Refs
	const background = useRef(null);
	const secondBackground = useRef(null);
	const infoHeader = useRef(null);

	//* States
	const [TabContent, setTabContent] = useState(null);
	const [appBackground, setAppBackground] = useState(undefined);
	const [timeOfDay, setTimeOfDay] = useState(undefined);
	const [imageNumber, setImageNumber] = useState(undefined);
	//* Contexts
	const OptionsProvider = useOptions();
	const WeatherContext = useWeather();

	const parallaxEffect = e => {
		const percentScrollOfPage = (Math.floor(window.scrollY) / (document.documentElement.scrollHeight - document.body.offsetHeight)) * 2;
		background.current.style.top = `${percentScrollOfPage * 80}px`;
		secondBackground.current.style.background = `rgba(0,0,0,${percentScrollOfPage * 0.55 + 0.15})`;
		infoHeader.current.style.opacity = `${1 - percentScrollOfPage}`;
	};

	const getSeasonName = () => {
		const seasonsDays = getSeasonDays();

		const daysSinceFirstDay = getDaysSinceYear();

		if (daysSinceFirstDay >= seasonsDays.spring[0] && daysSinceFirstDay <= seasonsDays.spring[1]) {
			return "spring";
		} else if (daysSinceFirstDay >= seasonsDays.summer[0] && daysSinceFirstDay <= seasonsDays.summer[1]) {
			return "summer";
		} else if (daysSinceFirstDay >= seasonsDays.autumn[1] && daysSinceFirstDay <= seasonsDays.autumn[2]) {
			return "autumn";
		}

		return "winter";
	};

	const handleWeatherBackground = weatherInfo => {
		const day = weatherInfo.weather[0].icon.charAt(weatherInfo.weather[0].icon.length - 1) === "d";
		const time = day ? "day" : "night";

		if (!timeOfDay || timeOfDay !== time) setTimeOfDay(time);
	};

	const getWeatherCondition = async weatherInfo => {
		if (!Object.entries(weatherInfo).length) return;

		let name = "";
		const day = weatherInfo.weather[0].icon.charAt(weatherInfo.weather[0].icon.length - 1) === "d";
		const condition = weatherInfo.weather[0].main;
		const description = weatherInfo.weather[0].description;
		let img;

		switch (condition) {
			case "Clouds":
				if (day) {
					if (description.includes("few clouds")) name = "cloudSun";
					else name = "cloud";
				} else name = "cloudMoon";
				break;
			case "Clear":
				if (day) name = "sun";
				else name = "moon";
				break;
			case "Thunderstorm":
				if (description.includes("rain")) name = "cloudLightningRain";
				else if (description.includes("drizzle")) name = "cloudLightningDrizzle";
				name = "cloudLigtning";
				break;
			case "Drizzle":
				name = "cloudDrizzle";
				break;
			case "Rain":
				name = "cloudRain";
				break;
			case "Snow":
				if (description.includes("rain")) name = "cloudRainAndSnow";
				else name = "cloudSnow";
				break;
			case "Tornado":
				name = "tornado";
				break;
			case "Mist":
				name = "mist";
				break;
			case "Dust":
				name = "dust";
				break;
			case "Smoke":
				name = "smoke";
				break;
			case "Fog":
				name = "fog";
				break;
			default:
				if (day) name = "cloud";
				else name = "cloudMoon";
		}

		const data = await import(/* webpackMode: "eager" */ `../services/WeatherConditionsImgs`);
		img = data.default[name];
		return img;
	};

	useEffect(() => {
		if (!imageNumber) {
			setImageNumber(() => Math.floor(Math.random() * 5 + 1));
		}

		if (timeOfDay && imageNumber) {
			(async () => {
				const bg = await import(/* webpackMode: "eager" */ `../assets/images/backgrounds/${getSeasonName()}/${timeOfDay}/${imageNumber}.jpg`);
				setAppBackground(bg.default);
				setTimeout(() => OptionsProvider.setAppLoaded(true), 400);
			})();

			document.addEventListener("scroll", parallaxEffect);
			return () => {
				document.removeEventListener("scroll", parallaxEffect);
			};
		}
	}, [timeOfDay, imageNumber]);

	useEffect(() => {
		if (WeatherContext.myCity) searchCity(WeatherContext.myCity);
	}, [WeatherContext.myCity]);

	useEffect(() => {
		let found = navigationTabsStructure.find(tabData => OptionsProvider.tabContentId === tabData.id);
		if (!found) found = {action: () => null};
		setTabContent(found.action());
	}, [OptionsProvider.tabContentId]);

	const handleWeatherInfo = (weatherInfo, action) => {
		switch (action.type) {
			case WeatherInfoActions.CITY_NAME:
				return {...weatherInfo, name: action.payload.name};
			case WeatherInfoActions.WEATHER_CURRENT:
				return {
					...weatherInfo,
					weatherDetails: {...weatherInfo.weatherDetails, currentWeather: action.payload.currentWeather}
				};
			case WeatherInfoActions.WEATHER_FORECAST:
				return {
					...weatherInfo,
					weatherDetails: {...weatherInfo.weatherDetails, forecast: action.payload.forecast}
				};
			default:
				return weatherInfo;
		}
	};

	const [weatherInfo, dispatchToWeatherInfo] = useReducer(handleWeatherInfo, {name: "", isNextFound: false, weatherDetails: {currentWeather: {}, forecast: {}}});

	const searchCity = async cityName => {
		let error;
		try {
			const cityData = await WeatherContext.setWeatherInfo(cityName);
			error = setErrorText(cityData.status);
			const country = countries.find(country => country.code === cityData.currentWeather.sys.country.toUpperCase());

			dispatchToWeatherInfo({
				type: WeatherInfoActions.WEATHER_CURRENT,
				payload: {
					currentWeather: {
						...cityData.currentWeather,
						sys: {...cityData.currentWeather.sys, country}
					}
				}
			});

			dispatchToWeatherInfo({
				type: WeatherInfoActions.WEATHER_FORECAST,
				payload: {
					forecast: cityData.forecast
				}
			});

			return true;
		} catch (err) {
			return {error};
		}
	};

	const roundTemperature = temp => {
		const roundedTemp = +temp.toFixed();
		if (!roundedTemp) return Math.abs(roundedTemp);
		return roundedTemp;
	};

	return (
		<article className={className}>
			<img src={appBackground} className="background" alt="background" ref={background} />
			<div ref={secondBackground} className="second-background"></div>

			{OptionsProvider.openMenu && <ModalToPage setOpen={OptionsProvider.setOpenMenu} Popup={{Component: StyledNavigation, values: {searchCity}}} />}
			{TabContent && <ModalToPage setOpen={OptionsProvider.setTabContentId} Popup={{Component: TabContent, values: {searchCity}}} />}

			<StyledSearchHeader
				ref={infoHeader}
				roundTemperature={roundTemperature}
				searchCity={searchCity}
				WeatherInfoActions={WeatherInfoActions}
				currentWeather={weatherInfo.weatherDetails.currentWeather}
				dispatchToWeatherInfo={dispatchToWeatherInfo}
				getWeatherCondition={getWeatherCondition}
				handleWeatherBackground={handleWeatherBackground}
			/>
			<StyledForecastSection roundTemperature={roundTemperature} forecast={weatherInfo.weatherDetails.forecast} getWeatherCondition={getWeatherCondition} />
			{!OptionsProvider.appLoaded || !Object.entries(weatherInfo.weatherDetails.currentWeather).length ? <StyledLoader /> : ""}
		</article>
	);
};

export default WeatherCnt;
