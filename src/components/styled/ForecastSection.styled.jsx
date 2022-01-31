import styled from "styled-components";
import ForecastSection from "../ForecastSection";
import mixins from "./Mixins";

const StyledForecastSection = styled(ForecastSection)`
	position: absolute;
	width: 100%;

	.chart {
		position: absolute;
		left: 0;
		width: 100%;
		pointer-events: none;
		transform: translateY(-100%);
		max-height: 40vh;
	}

	.forecast {
		width: 100%;
		padding-top: 3rem;
		flex-grow: 1;
		background: rgb(255, 255, 255);
	}

	.forecast-sections-cnt {
		${mixins.flex({posOne: "stretch", posTwo: "flex-start"})};
		scroll-behavior: smooth;
		width: 100vw;
		max-height: 540px;
		overflow-y: auto;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}

		&__section {
			flex: 0 0 100%;
			overflow-x: hidden;
			scroll-snap-align: start;

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}

	.forecast-info {
		display: grid;
		grid-template-columns: 2fr 64px 2fr;
		padding: 1rem 3rem;

		&__header {
			${mixins.flex({posOne: "center", posTwo: "flex-end"})}
			font-size: 1.4rem;
			font-weight: 400;
			text-align: center;
			color: hsl(197, 0%, 46%);
			width: 50px;

			&--day {
				text-align: left;
				width: min-content;
			}
		}

		&__svg {
			transform: scale(1.4);
		}

		${mixins.media("tablet")`
			&__header{
				margin: 0 1rem;
			}

			&__svg{
				transform: scale(1.5);
			}
		`}

		${mixins.media("tablet-large")`
			&__header{
				font-size: 2.8rem;
			}
		`}
	}

	.temps-header {
		${mixins.flex({posOne: "center", posTwo: "flex-end"})}
	}

	.tab-pan {
		position: relative;
		${mixins.flex({posOne: "center", posTwo: "center"})};
		width: max-content;
		margin: 0 auto 3rem auto;

		&__line {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 3px;
			background: rgb(200, 200, 200);
			border-radius: 3px;
		}

		&__indicator {
			position: absolute;
			top: 0;
			left: 0;
			background: hsl(229, 79%, 27%);
			width: 50%;
			height: 100%;
			border-radius: 3px;
		}
	}

	.tab {
		margin: 0.5rem 0;
		color: rgb(200, 200, 200);
		border-radius: 1rem;
		cursor: pointer;

		&__header {
			margin: 1rem;
		}

		&__name {
			font-size: 2rem;
		}

		&__link {
			display: block;
			color: inherit;
			text-decoration: none;
		}

		&--active {
			color: hsl(229, 79%, 27%);
		}
	}

	.current-details {
		&__header {
			padding: 2rem;
			text-align: center;
		}

		&__title {
			font-size: 3rem;
			font-weight: 500;
			color: hsl(197, 0%, 46%);
		}
	}

	.info {
		${mixins.flex({posOne: "center", posTwo: "center"})};
		flex-wrap: wrap;

		&__tile {
			${mixins.flex({posOne: "space-between", posTwo: "center"})};
			max-width: 140px;
			margin: 1rem;
		}
	}

	.info-section {
		${mixins.flex({posOne: "left", posTwo: "space-between"})};
		flex-direction: column;
		width: 100px;
		max-width: 50%;
		margin: 1rem 0rem;

		&__title {
			font-size: 1.4rem;
			color: hsl(197, 0%, 46%);
			font-weight: 300;
		}

		&__value {
			font-size: 1.5rem;
			font-weight: 400;
			color: hsl(229, 79%, 27%);
		}
	}

	.img-section {
		${mixins.flex({posOne: "center", posTwo: "center"})};
		width: 44px;
		height: 44px;
		margin: 1rem;
		background: rgb(240, 240, 240);
		border-radius: 50%;
	}

	.tile-svg {
		transform: scale(1.6);
	}
`;

export default StyledForecastSection;
