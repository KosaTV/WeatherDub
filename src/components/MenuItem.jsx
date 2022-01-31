import {useOptions} from "../contexts/OptionsProvider";

const MenuItem = ({item, searchCity}) => {
	const OptionsProvider = useOptions();
	return (
		<li
			className="menu__item"
			onClick={e => {
				if (item.onClick) item.onClick(OptionsProvider);
				if (item.action) item.action(searchCity);
			}}
		>
			<a className="menu__link" href="#forecast" onClick={e => e.preventDefault()}>
				<span className="menu__icon">{item.icon}</span>
				<span className="menu__item-text">{item.label}</span>
			</a>
		</li>
	);
};

export default MenuItem;
