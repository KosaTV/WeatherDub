const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const addZeroForClock = number => {
	return number <= 9 ? `0${number}` : number;
};

const getDaysSinceYear = (year = new Date().getFullYear()) => {
	const firstDay = new Date(year, 0);
	const diff = new Date().getTime() - firstDay.getTime();
	const daysSinceFirstDay = Math.ceil(diff / 1000 / 60 / 60 / 24);

	return daysSinceFirstDay;
};

const getSeasonDays = () => {
	const currentYear = new Date().getFullYear();
	const days = months.map((month, i) => {
		return new Date(currentYear, i + 1, 0).getDate();
	});

	const getDaysInYear = year => {
		const isLeap = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
		return isLeap ? 366 : 365;
	};

	let seasonsDays = {
		spring: [],
		summer: [],
		autumn: [],
		winter: []
	};

	months.forEach((month, i) => {
		const daysOfMonths = days.slice(0, i).reduce((day, currentDays) => {
			return day + currentDays;
		}, 0);

		switch (month) {
			case "March":
				seasonsDays.spring.push(daysOfMonths + 1);
				break;
			case "May":
				seasonsDays.spring.push(daysOfMonths + 31);
				break;
			case "June":
				seasonsDays.summer.push(daysOfMonths + 1);
				break;
			case "August":
				seasonsDays.summer.push(daysOfMonths + 31);
				break;
			case "September":
				seasonsDays.autumn.push(daysOfMonths + 1);
				break;
			case "November":
				seasonsDays.autumn.push(daysOfMonths + 30);
				break;
			case "December":
				seasonsDays.winter.push(daysOfMonths + 1);
				break;
			case "February":
				seasonsDays.winter.push(getDaysInYear(currentYear) + daysOfMonths + 28);
				break;
			default:
				return;
		}
	});

	return seasonsDays;
};

export {months, days, addZeroForClock, getSeasonDays, getDaysSinceYear};
