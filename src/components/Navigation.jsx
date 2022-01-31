import {nanoid} from "nanoid";
import React from "react";
import MenuItem from "./MenuItem";
import navigationTabsStructure from "../utils/tabsData";

const Navigation = ({className, searchCity}) => {
	return (
		<nav className={className}>
			<ul className="menu">
				{navigationTabsStructure.map(item => {
					return <MenuItem key={nanoid()} item={item} searchCity={searchCity} />;
				})}
			</ul>
		</nav>
	);
};

export default Navigation;
