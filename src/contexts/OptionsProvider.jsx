import React, {useContext, useEffect, useState} from "react";

const OptionsContext = React.createContext();
const useOptions = () => useContext(OptionsContext);

const OptionsProvider = ({children}) => {
	const [cityPopupToggle, setCityPopupToggle] = useState(false);
	const [searchCityPopupToggle, setSearchCityPopupToggle] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	const [tabContentId, setTabContentId] = useState(null);
	const [appLoaded, setAppLoaded] = useState(false);
	const [forecastTab, setForecastTab] = useState("daily");

	useEffect(() => {
		document.querySelector(".page").classList.toggle("page--sticked", cityPopupToggle || openMenu || !appLoaded);
	}, [cityPopupToggle, openMenu, tabContentId, appLoaded]);

	return (
		<OptionsContext.Provider
			value={{
				cityPopupToggle,
				setCityPopupToggle,
				searchCityPopupToggle,
				setSearchCityPopupToggle,
				openMenu,
				setOpenMenu,
				tabContentId,
				setTabContentId,
				forecastTab,
				setForecastTab,
				appLoaded,
				setAppLoaded
			}}
		>
			{children}
		</OptionsContext.Provider>
	);
};

export {useOptions, OptionsProvider};
