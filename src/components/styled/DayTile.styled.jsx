import DayTile from "../DayTile";
import styled from "styled-components";
import mixins from "./Mixins";

const StyledDayTile = styled(DayTile)`
	display: grid;
	grid-template-columns: 2fr 64px 2fr;
	color: hsla(229, 79%, 27%, 0.6);
	align-items: center;
	justify-items: center;
	padding: 1rem 3rem;

	&:first-child {
		color: hsl(229, 79%, 27%);
	}

	&__weather-day {
		display: block;
		font-size: 1.8rem;
		padding: 0.2rem 0;
		justify-self: left;

		&--shortened {
			display: none;
		}

		${mixins.media("phone-mini")`
			display: none;

			&--shortened {
				display: block;
			}
		`}

		${mixins.media("tablet")`
			font-size: 2.5rem;
		`}

		${mixins.media("tablet-large")`
			font-size: 3rem;
		`}
	}

	&__description {
		display: none;
		line-height: 1.4;
		font-size: 1.4rem;
		padding: 0.4rem;
		margin: 0 0.5rem;
		min-width: 10%;
		text-align: left;

		${mixins.media("tablet-large")`
			display: inline;
		`}
	}

	.visual {
		${mixins.flex({posOne: "center", posTwo: "center"})}
		width: 32px;
		height: 50px;

		.condition-svg {
			transform: scale(2);

			${mixins.media("tablet")`
				transform: scale(3);
			`}

			&__path {
				fill: hsl(229, 79%, 27%);
			}
		}
	}

	.temps {
		display: flex;
		justify-content: flex-end;
		font-weight: 600;
		justify-self: right;

		&__temp {
			${mixins.flex({posOne: "center", posTwo: "flex-end"})};
			font-size: 1.8rem;
			min-width: 50px;
		}

		${mixins.media("tablet")`
			&__temp {
				font-size: 3rem;
				margin: 0 1rem;
			}
		`}
	}
`;

export default StyledDayTile;
