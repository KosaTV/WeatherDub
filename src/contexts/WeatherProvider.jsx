import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const WeatherContext = React.createContext();

const useWeather = () => useContext(WeatherContext);

const APIKEY = process.env.REACT_APP_API_KEY;

const WeatherProvider = ({children}) => {
	const [myCity, setMyCity] = useState("");
	const [startCity, setStartCity] = useLocalStorage("startCity", "");
	const [citiesCollection, setCitiesCollection] = useLocalStorage("cities-collection", "[]");

	useEffect(() => {
		(async () => {
			if (!startCity.length) {
				const isUserLocationAllowed = (await navigator.permissions.query({name: "geolocation"})).state;

				let result;
				let cityName;

				if (isUserLocationAllowed === "granted") {
					result = await new Promise((resolve, reject) => {
						navigator.geolocation.getCurrentPosition(async position => {
							const {latitude: lat, longitude: lon} = position.coords;
							const res = await axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=1&appid=${APIKEY}`);
							if (res.status !== 200) return reject(res);
							return resolve(res);
						});
					});
				}

				if (result) {
					cityName = result.data.list[0].name;
					setStartCity(JSON.stringify(cityName));
					if (citiesCollection) setCitiesCollection(JSON.stringify([...JSON.parse(citiesCollection), cityName]));
					else setCitiesCollection(JSON.stringify([cityName]));
				} else {
					cityName = "New York";
				}
				setMyCity(cityName);
			} else {
				setMyCity(JSON.parse(startCity));
			}
		})();
	}, []);

	const getOneCityWeatherData = async cityName => {
		const cityAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}&units=metric`;
		try {
			const data = await axios.get(cityAPI);
			return data.data;
		} catch (err) {
			return err;
		}
	};

	const getForecast = async ({lat, lon}) => {
		let forecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely&appid=${APIKEY}&units=metric`;

		const data = await axios.get(forecast);

		return data.data;
	};

	const setWeatherInfo = async cityName => {
		try {
			const currentWeather = await getOneCityWeatherData(cityName);
			if (currentWeather.response && currentWeather.response !== 200) return currentWeather.response;
			const coords = currentWeather.coord;
			let forecast = await getForecast(coords);
			forecast = {
				...forecast,
				daily: forecast.daily.filter(day => {
					const date = new Date(day.dt * 1000);
					return date.getDate() !== new Date().getDate();
				})
			};
			return {currentWeather, forecast};
		} catch (err) {
			return err.response;
		}
	};

	return (
		<WeatherContext.Provider value={{myCity, getOneCityWeatherData, setWeatherInfo, startCity, setStartCity, citiesCollection, setCitiesCollection}}>
			{children}
		</WeatherContext.Provider>
	);
};

export {WeatherProvider, useWeather};
