import React from "react";
import {Helmet} from "react-helmet";
import favicon from "../assets/icon/favicon.svg";

const DocumentHeader = () => {
	return (
		<Helmet>
			<title>Weather App</title>
			<link rel="icon" href={favicon} />
			<meta name="description" content="Check weather in range of entire world. Just type any city to see the weather." />
			<meta name="keywords" content="weather,weather online,weather app" />
			<meta name="author" content="Jacob Chodubski" />
			<meta name="robots" content="index, follow" />
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
			<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500&display=swap" rel="stylesheet" />
		</Helmet>
	);
};

export default DocumentHeader;
