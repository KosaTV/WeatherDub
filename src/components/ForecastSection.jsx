import React, {useEffect, useState, useRef} from "react";
import Chart from "chart.js/auto"; // eslint-disable-next-line
import {Line} from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import StyledDayTile from "./styled/DayTile.styled";
import {nanoid} from "nanoid";
import {useOptions} from "../contexts/OptionsProvider";
import WeatherInfoTile from "./WeatherInfoTile";

//*
import tabs from "../utils/forecastTabsData";
import createWeatherInfoTabData from "../utils/weatherInfoTileData";
import prepareChartWaveEffect from "../utils/prepareChartWaveEffect";

const ForecastSection = ({className, forecast, roundTemperature, getWeatherCondition}) => {
	const [dailyForecastTiles, setDailyForecastTiles] = useState(undefined);
	const [hourlyForecastTiles, setHourlyForecastTiles] = useState(undefined);
	const [temperatureData, setTemperatureData] = useState({
		temperatures: [10, 10, 10, 10, 10, 10, 10],
		maxTemp: 10,
		minTemp: 5,
		labelTemps: ["", 10, 10, 10, 10, 10, 10, 10, ""],
		temperaturesForChart: [10, 10, 10, 10, 10, 10, 10]
	});
	const [currentTab, setCurrentTab] = useState("#daily-forecast");
	const [weatherInfoTilesData, setWeatherInfoTilesData] = useState([]);

	const OptionsProvider = useOptions();
	const indicatorRef = useRef();

	const handleForecastLink = e => {
		e.preventDefault();
		OptionsProvider.setForecastTab(e.target.hash);
	};

	const handleTabSwitch = hash => {
		const tab = document.querySelector(hash);
		tab.scrollIntoView({behavior: "smooth"});
	};

	const handleSlide = e => {
		const lineLength = document.querySelector(".tab-pan__line").getBoundingClientRect().width;
		const indicatorLenght = indicatorRef.current.getBoundingClientRect().width;
		Array.from(e.target.children).forEach(section => {
			const position = section.getBoundingClientRect().x;
			if (position === 0) OptionsProvider.setForecastTab(`#${section.id}`);
		});
		const mainSection = e.target.children[0].getBoundingClientRect();
		const scrolled = Math.abs(mainSection.left);
		const maxScroll = Math.abs(mainSection.width);
		const progress = scrolled / maxScroll;
		const leftSpace = lineLength - indicatorLenght;
		indicatorRef.current.style.transform = `translateX(${leftSpace * progress}px)`;
	};

	useEffect(() => {
		const tab = document.querySelector(`${OptionsProvider.forecastTab}`);
		if (tab) {
			const hash = `#${tab.id}`;
			handleTabSwitch(hash);
			setCurrentTab(hash);
		}
	}, [OptionsProvider.forecastTab]);

	useEffect(() => {
		if (Object.entries(forecast).length) {
			setDailyForecastTiles(
				forecast.daily.map((el, i) => <StyledDayTile key={nanoid()} type="day" getWeatherCondition={getWeatherCondition} weatherInfo={forecast.daily[i]} />)
			);

			const temperatures = forecast.daily.map(el => roundTemperature(el.temp.eve));

			setTemperatureData(data => {
				return {
					...data,
					temperatures
				};
			});

			setHourlyForecastTiles(
				forecast.hourly.map((el, i) => <StyledDayTile key={nanoid()} type="hour" getWeatherCondition={getWeatherCondition} weatherInfo={forecast.hourly[i]} />)
			);

			setWeatherInfoTilesData(createWeatherInfoTabData(forecast.hourly[0]));
		}
	}, [forecast]);

	useEffect(() => {
		const temperaturesForChart = temperatureData.temperatures.map(temp => {
			const min = Math.min(...temperatureData.temperatures);
			return temp + -min + 5;
		});

		setTemperatureData(data => {
			return {
				...data,
				maxTemp: Math.max(...temperaturesForChart),
				minTemp: Math.min(...temperaturesForChart),
				labelTemps: ["", ...data.temperatures, ""],
				temperaturesForChart
			};
		});
	}, [temperatureData.temperatures]);

	return (
		<section className={className}>
			<div className="chart">
				<Line {...prepareChartWaveEffect(temperatureData)} plugins={[ChartDataLabels]} />
			</div>
			<article className="forecast">
				<section onScroll={handleSlide} className="forecast-sections-cnt">
					<section id="daily-forecast" className="forecast-sections-cnt__section forecast-sections-cnt__section__daily">
						<header className="forecast-info">
							<h3 className="forecast-info__header forecast-info__header--day">Day</h3>
							<div className="empty-column"></div>
							<div className="temps-header">
								<h3 className="forecast-info__header forecast-info__header--morning">
									<svg className="forecast-info__svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											className="forecast-info__path"
											d="M0.5 12H15.5C15.6326 12 15.7598 12.0527 15.8536 12.1464C15.9473 12.2402 16 12.3674 16 12.5C16 12.6326 15.9473 12.7598 15.8536 12.8536C15.7598 12.9473 15.6326 13 15.5 13H0.5C0.367392 13 0.240215 12.9473 0.146447 12.8536C0.0526784 12.7598 0 12.6326 0 12.5C0 12.3674 0.0526784 12.2402 0.146447 12.1464C0.240215 12.0527 0.367392 12 0.5 12V12ZM2.522 10.5C2.64474 9.13188 3.27497 7.8592 4.28873 6.93232C5.30249 6.00544 6.62639 5.49144 8 5.49144C9.37361 5.49144 10.6975 6.00544 11.7113 6.93232C12.725 7.8592 13.3553 9.13188 13.478 10.5H12.473C12.3518 9.3984 11.8283 8.38027 11.0029 7.64072C10.1775 6.90117 9.10825 6.49221 8 6.49221C6.89175 6.49221 5.82248 6.90117 4.99708 7.64072C4.17168 8.38027 3.64822 9.3984 3.527 10.5H2.522V10.5ZM8 2C8.13261 2 8.25979 2.05268 8.35355 2.14645C8.44732 2.24021 8.5 2.36739 8.5 2.5V4C8.5 4.13261 8.44732 4.25979 8.35355 4.35355C8.25979 4.44732 8.13261 4.5 8 4.5C7.86739 4.5 7.74021 4.44732 7.64645 4.35355C7.55268 4.25979 7.5 4.13261 7.5 4V2.5C7.5 2.36739 7.55268 2.24021 7.64645 2.14645C7.74021 2.05268 7.86739 2 8 2V2ZM14.364 4.636C14.4577 4.72976 14.5104 4.85692 14.5104 4.9895C14.5104 5.12208 14.4577 5.24924 14.364 5.343L13.304 6.403C13.2579 6.45075 13.2027 6.48885 13.1417 6.51505C13.0807 6.54126 13.0151 6.55505 12.9487 6.55563C12.8823 6.5562 12.8165 6.54355 12.755 6.51841C12.6936 6.49327 12.6377 6.45614 12.5908 6.4092C12.5439 6.36225 12.5067 6.30643 12.4816 6.24498C12.4564 6.18353 12.4438 6.11769 12.4444 6.0513C12.445 5.98491 12.4587 5.9193 12.4849 5.8583C12.5112 5.7973 12.5492 5.74212 12.597 5.696L13.657 4.636C13.7508 4.54226 13.8779 4.48961 14.0105 4.48961C14.1431 4.48961 14.2702 4.54226 14.364 4.636V4.636ZM1.636 4.636C1.72976 4.54226 1.85692 4.48961 1.9895 4.48961C2.12208 4.48961 2.24924 4.54226 2.343 4.636L3.403 5.696C3.45076 5.74212 3.48885 5.7973 3.51505 5.8583C3.54126 5.9193 3.55505 5.98491 3.55563 6.0513C3.5562 6.11769 3.54355 6.18353 3.51841 6.24498C3.49327 6.30643 3.45614 6.36225 3.4092 6.4092C3.36225 6.45614 3.30643 6.49327 3.24498 6.51841C3.18353 6.54355 3.11769 6.5562 3.0513 6.55563C2.98491 6.55505 2.9193 6.54126 2.8583 6.51505C2.7973 6.48885 2.74212 6.45075 2.696 6.403L1.636 5.343C1.54226 5.24924 1.48961 5.12208 1.48961 4.9895C1.48961 4.85692 1.54226 4.72976 1.636 4.636V4.636Z"
											fill="hsl(197, 0%, 46%)"
										/>
									</svg>
								</h3>
								<h3 className="forecast-info__header forecast-info__header--night">
									<svg className="forecast-info__svg" width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g clipPath="url(#clip0_14_4)">
											<path
												className="forecast-info__path"
												d="M18.2424 7.40614C18.1735 7.25917 18.0674 7.13271 17.9347 7.03925C17.802 6.94579 17.6471 6.88857 17.4855 6.87322C16.6801 6.79096 15.9331 6.41505 15.3871 5.81722C14.9185 5.29048 14.5982 4.64868 14.4592 3.95752C14.3201 3.26636 14.3672 2.55065 14.5957 1.88368C14.6495 1.72267 14.6608 1.5505 14.6285 1.38384C14.5963 1.21717 14.5216 1.06164 14.4117 0.932295C14.3108 0.813085 14.1804 0.722359 14.0336 0.669135C13.8868 0.615911 13.7286 0.602043 13.5748 0.628911L13.5631 0.630757C12.5091 0.862293 11.5617 1.43675 10.8691 2.26421C10.1765 3.09168 9.77775 4.12544 9.73537 5.20368C9.2388 5.02029 8.71394 4.92531 8.1846 4.92306C7.20459 4.92825 6.25131 5.24316 5.46104 5.82276C4.67078 6.40236 4.084 7.21697 3.7846 8.15014C2.92884 8.39431 2.19022 8.93968 1.70498 9.68566C1.21974 10.4316 1.02061 11.3279 1.1443 12.2092C1.26799 13.0905 1.70616 13.8973 2.37801 14.4809C3.04986 15.0645 3.91007 15.3854 4.79998 15.3846H11.5692C12.1654 15.3869 12.7533 15.2443 13.2821 14.9689C13.8109 14.6936 14.2649 14.2938 14.6049 13.8041C14.9449 13.3143 15.1608 12.7492 15.2339 12.1575C15.307 11.5658 15.2352 10.9652 15.0246 10.4074C15.6668 10.3048 16.2801 10.0677 16.8243 9.71174C17.3685 9.35574 17.8315 8.88881 18.1828 8.34153C18.2731 8.20424 18.3261 8.04577 18.3366 7.88175C18.3471 7.71772 18.3146 7.5538 18.2424 7.40614V7.40614ZM11.5692 14.1538H4.79998C4.18355 14.1549 3.58925 13.9242 3.13497 13.5075C2.68068 13.0908 2.3996 12.5186 2.34747 11.9044C2.29534 11.2902 2.47598 10.6788 2.85355 10.1915C3.23112 9.70426 3.77804 9.3767 4.38583 9.27383L4.79383 9.20491L4.88306 8.80122C5.05006 8.05009 5.46819 7.37837 6.06843 6.89692C6.66867 6.41548 7.41513 6.1531 8.1846 6.1531C8.95406 6.1531 9.70053 6.41548 10.3008 6.89692C10.901 7.37837 11.3191 8.05009 11.4861 8.80122L11.5754 9.20491L11.9834 9.27445C12.5904 9.37813 13.1363 9.70594 13.5131 10.193C13.89 10.68 14.0702 11.2908 14.0181 11.9044C13.966 12.518 13.6854 13.0897 13.2319 13.5063C12.7784 13.9228 12.185 14.1539 11.5692 14.1538ZM14.3169 9.23014H14.304C13.8438 8.71536 13.2476 8.341 12.584 8.15014C12.2948 7.24992 11.7363 6.46012 10.984 5.88737C10.9778 5.82522 10.9618 5.76614 10.9588 5.70276C10.9051 4.91549 11.1018 4.13142 11.5207 3.46271C11.9396 2.79399 12.5593 2.2749 13.2911 1.97968C13.098 2.79734 13.1058 3.64958 13.3137 4.46359C13.5216 5.27759 13.9234 6.02918 14.4849 6.65414C15.1239 7.349 15.963 7.82812 16.8861 8.02522C16.5726 8.40233 16.1798 8.70577 15.7358 8.91402C15.2918 9.12226 14.8073 9.23019 14.3169 9.23014V9.23014Z"
												fill="hsl(197, 0%, 46%)"
											/>
										</g>
										<defs>
											<clipPath id="clip0_14_4">
												<rect width="18.4615" height="16" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</h3>
							</div>
						</header>
						<main>
							<ul className="tiles">{dailyForecastTiles}</ul>
						</main>
					</section>
					<section id="hourly-forecast" className="forecast-sections-cnt__section forecast-sections-cnt__section__hourly">
						<header className="forecast-info">
							<h3 className="forecast-info__header forecast-info__header--day">Hour</h3>
							<div className="empty-column"></div>
							<div className="temps-header">
								<h3 className="forecast-info__header forecast-info__header--hour">
									<svg className="forecast-info__svg " width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											className="forecast-info__path"
											d="M2.14709 3.61694C2.86974 3.61694 3.45556 3.03112 3.45556 2.30847C3.45556 1.58582 2.86974 1 2.14709 1C1.42445 1 0.838623 1.58582 0.838623 2.30847C0.838623 3.03112 1.42445 3.61694 2.14709 3.61694Z"
											stroke="hsl(197, 0%, 46%)"
											strokeWidth="1"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											className="tile-svg__path"
											d="M13 3.60206C13 2.91195 12.6839 2.25011 12.1213 1.76213C11.5587 1.27415 10.7956 1 10 1H9C8.20435 1 7.44129 1.27415 6.87868 1.76213C6.31607 2.25011 6 2.91195 6 3.60206V8.80619C6 9.4963 6.31607 10.1581 6.87868 10.6461C7.44129 11.1341 8.20435 11.4083 9 11.4083H10C10.7956 11.4083 11.5587 11.1341 12.1213 10.6461C12.6839 10.1581 13 9.4963 13 8.80619"
											stroke="hsl(197, 0%, 46%)"
											strokeWidth="1"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</h3>
							</div>
						</header>
						<ul className="tiles">{hourlyForecastTiles}</ul>
					</section>
				</section>
				<div className="tab-pan">
					{tabs.map(tab => (
						<div key={nanoid()} className={`tab ${currentTab === tab.href && "tab--active"}`}>
							<div className="tab__header">
								<h1 className="tab__name">
									<a onClick={handleForecastLink} className="tab__link" href={tab.href}>
										{tab.name}
									</a>
								</h1>
							</div>
						</div>
					))}
					<div className="tab-pan__line">
						<div className="tab-pan__indicator" ref={indicatorRef}></div>
					</div>
				</div>
			</article>
			<article className="current-details">
				<header className="current-details__header">
					<h1 className="current-details__title">Weather now</h1>
				</header>
				{forecast.hourly && (
					<section className="info">
						{weatherInfoTilesData.map(tile => (
							<WeatherInfoTile key={nanoid()} {...tile} />
						))}
					</section>
				)}
			</article>
		</section>
	);
};

export default ForecastSection;
