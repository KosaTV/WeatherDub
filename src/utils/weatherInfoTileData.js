const createWeatherInfoTabData = infoObject => [
	{
		svg: (
			<svg className="tile-svg" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					className="tile-svg__path"
					d="M2.14709 3.61694C2.86974 3.61694 3.45556 3.03112 3.45556 2.30847C3.45556 1.58582 2.86974 1 2.14709 1C1.42445 1 0.838623 1.58582 0.838623 2.30847C0.838623 3.03112 1.42445 3.61694 2.14709 3.61694Z"
					stroke="hsl(229, 79%, 27%)"
					strokeWidth="1"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					className="tile-svg__path"
					d="M13 3.60206C13 2.91195 12.6839 2.25011 12.1213 1.76213C11.5587 1.27415 10.7956 1 10 1H9C8.20435 1 7.44129 1.27415 6.87868 1.76213C6.31607 2.25011 6 2.91195 6 3.60206V8.80619C6 9.4963 6.31607 10.1581 6.87868 10.6461C7.44129 11.1341 8.20435 11.4083 9 11.4083H10C10.7956 11.4083 11.5587 11.1341 12.1213 10.6461C12.6839 10.1581 13 9.4963 13 8.80619"
					stroke="hsl(229, 79%, 27%)"
					strokeWidth="1"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		label: "Feel like",
		value: `${infoObject.feels_like}°`
	},
	{
		svg: (
			<svg className="tile__svg" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					className="tile__svg__path"
					d="M6.6 2.1C6.6 0.942 5.658 0 4.5 0C3.2796 0 2.55 0.915 2.55 1.8H3.75C3.75 1.551 3.9828 1.2 4.5 1.2C4.9962 1.2 5.4 1.6038 5.4 2.1C5.4 2.5962 4.9962 3 4.5 3H0V4.2H4.5C5.658 4.2 6.6 3.258 6.6 2.1ZM8.1 7.8H3.6V9H8.1C8.5962 9 9 9.4038 9 9.9C9 10.3962 8.5962 10.8 8.1 10.8C7.5828 10.8 7.35 10.449 7.35 10.2H6.15C6.15 11.085 6.8796 12 8.1 12C9.258 12 10.2 11.058 10.2 9.9C10.2 8.742 9.258 7.8 8.1 7.8Z"
					fill="hsl(229, 79%, 27%)"
				/>
				<path
					className="tile__svg__path"
					d="M9.6 1.79999C8.2764 1.79999 7.2 2.87639 7.2 4.19999H8.4C8.4 3.53819 8.9382 2.99999 9.6 2.99999C10.2618 2.99999 10.8 3.53819 10.8 4.19999C10.8 4.86179 10.2618 5.39999 9.6 5.39999H0V6.59999H9.6C10.9236 6.59999 12 5.52359 12 4.19999C12 2.87639 10.9236 1.79999 9.6 1.79999ZM0 7.79999H2.4V8.99999H0V7.79999Z"
					fill="hsl(229, 79%, 27%)"
				/>
			</svg>
		),
		label: "Wind",
		value: `${infoObject.wind_speed}°`
	},
	{
		svg: (
			<svg className="tile-svg" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					className="tile-svg__path"
					d="M2.14709 3.61694C2.86974 3.61694 3.45556 3.03112 3.45556 2.30847C3.45556 1.58582 2.86974 1 2.14709 1C1.42445 1 0.838623 1.58582 0.838623 2.30847C0.838623 3.03112 1.42445 3.61694 2.14709 3.61694Z"
					stroke="hsl(229, 79%, 27%)"
					strokeWidth="1"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					className="tile-svg__path"
					d="M13 3.60206C13 2.91195 12.6839 2.25011 12.1213 1.76213C11.5587 1.27415 10.7956 1 10 1H9C8.20435 1 7.44129 1.27415 6.87868 1.76213C6.31607 2.25011 6 2.91195 6 3.60206V8.80619C6 9.4963 6.31607 10.1581 6.87868 10.6461C7.44129 11.1341 8.20435 11.4083 9 11.4083H10C10.7956 11.4083 11.5587 11.1341 12.1213 10.6461C12.6839 10.1581 13 9.4963 13 8.80619"
					stroke="hsl(229, 79%, 27%)"
					strokeWidth="1"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		label: "Cloudiness",
		value: `${infoObject.feels_like}°`
	},
	{
		svg: (
			<svg className="tile-svg" width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					className="tile-svg__path"
					d="M4.9714 11.1429C3.88023 11.1429 2.83374 10.7094 2.06216 9.93781C1.29058 9.16624 0.857117 8.11975 0.857117 7.02858C0.857117 5.22755 2.25083 3.78703 3.47637 2.46686L4.9714 0.857147L6.46643 2.46686C7.69197 3.78755 9.08569 5.22806 9.08569 7.02858C9.08569 8.11975 8.65222 9.16624 7.88064 9.93781C7.10906 10.7094 6.06258 11.1429 4.9714 11.1429V11.1429Z"
					stroke="hsl(229, 79%, 27%)"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		label: "Humidity",
		value: `${infoObject.humidity}°`
	},
	{
		svg: (
			<svg className="tile-svg" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					className="tile-svg__path"
					d="M10.98 5.7C8.99998 2.94 5.09998 2.28 2.33998 4.32C1.61998 4.86 1.01998 5.58 0.539978 6.36C0.659978 6.6 0.839978 6.84 1.01998 7.08C2.99998 9.84 6.77998 10.44 9.53998 8.52C10.08 8.1 10.56 7.68 10.98 7.08C11.16 6.84 11.28 6.6 11.46 6.36C11.28 6.12 11.16 5.88 10.98 5.7V5.7ZM6.05998 4.32C6.35998 4.02 6.83998 4.02 7.13998 4.32C7.43998 4.62 7.43998 5.1 7.13998 5.4C6.83998 5.7 6.35998 5.7 6.05998 5.4C5.75998 5.1 5.75998 4.62 6.05998 4.32ZM5.99998 8.94C4.13998 8.94 2.39998 7.98 1.37998 6.42C2.09998 5.4 3.05998 4.68 4.19998 4.32C3.77998 4.8 3.59998 5.34 3.59998 5.94C3.59998 7.26 4.61998 8.4 5.99998 8.4C7.31998 8.4 8.45998 7.38 8.45998 6V5.94C8.45998 5.34 8.21998 4.74 7.79998 4.32C8.93998 4.68 9.89998 5.4 10.62 6.42C9.59998 7.98 7.85998 8.94 5.99998 8.94V8.94Z"
					fill="hsl(229, 79%, 27%)"
				/>
			</svg>
		),
		label: "Visibility",
		value: `${infoObject.visibility}°`
	},
	{
		svg: (
			<svg className="tile-svg" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					className="tile-svg__path"
					d="M1.3125 9L6 11.4375L10.6875 9M2.4375 6.1875L1.3125 6.75L6 9.1875L10.6875 6.75L9.5625 6.1875H2.4375Z"
					stroke="hsl(229, 79%, 27%)"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					className="tile-svg__path"
					d="M4.3125 3.75L6 5.25L7.6875 3.75M6 5.25V0.375V5.25Z"
					stroke="hsl(229, 79%, 27%)"
					strokeWidth=".7"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		label: "Preassure",
		value: `${infoObject.pressure}°`
	}
];

export default createWeatherInfoTabData;
