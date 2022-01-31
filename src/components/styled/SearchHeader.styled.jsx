import styled from "styled-components";
import mixins from "./Mixins";
import SearchHeader from "../SearchHeader";

const StyledSearchHeader = styled(SearchHeader)`
	position: fixed;
	top: 0;
	left: 0;
	padding: 2rem;
	width: 100%;
	${mixins.flex({posOne: "flex-start", posTwo: "center"})};
	flex-direction: column;
	color: white;

	${mixins.media("tablet-large")`
		padding: 6rem;
	`}

	.content {
		${mixins.flex({posOne: "center", posTwo: "space-between"})}
		padding: 6rem 0;
	}

	.options {
		${mixins.flex({posOne: "center", posTwo: "space-between"})}
		&__button {
			cursor: pointer;
			${mixins.flex({posOne: "center", posTwo: "center"})}
			padding: 1rem;
			border: none;
			background: transparent;

			&--add-city {
				padding: 1rem 2.5rem;
			}

			${mixins.media("tablet-large")`
				transform: scale(1.5);
        	`}
		}
	}

	.weather-info {
		width: 100%;
		&__header {
			${mixins.flex({posOne: "center", posTwo: "space-between"})};
		}
	}

	.text-info {
		&__city-info {
			font-size: 1.6rem;
			font-weight: 600;
			margin-bottom: 0.75rem;
		}

		&__date {
			font-size: 1.15rem;
			font-weight: 500;
		}

		${mixins.media("tablet-large")`
			&__city-info {
				font-size: 3.2rem;
			}

			&__date {
				font-size: 2.3rem;
			}
        `}
	}

	.condition {
		${mixins.flex({posOne: "flex-start", posTwo: "center"})};
		flex-direction: column;
		width: 100px;

		&__img {
			padding: 1rem;

			${mixins.media("tablet-large")`
				padding: 2rem 2rem 6rem 4rem;
        	`}
		}

		&__desc {
			font-weight: 500;
			font-size: 2rem;
		}

		${mixins.media("tablet-large")`
			&__desc {
				font-size: 4rem;
			}
        `}
	}

	.condition-svg {
		&__path {
		}

		${mixins.media("tablet-large")`
			transform: scale(6);
        `}
	}

	.temperature {
		${mixins.flex({posOne: "flex-start", posTwo: "flex-start"})};

		&__temp {
			font-size: 10rem;
			font-weight: 500;
			line-height: 0.9;
		}

		&__unit {
			font-size: 7.5rem;
			font-weight: 500;
			white-space: nowrap;
			line-height: 0.9;
		}

		${mixins.media("tablet-large")`
			&__temp {
				font-size: 20rem;
			}

			&__unit{
				font-size: 14rem;
			}
        `}
	}
`;

export default StyledSearchHeader;
