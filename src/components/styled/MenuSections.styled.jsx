import {css} from "styled-components";
import mixins from "./Mixins";

const MenuSectionsBaseStyle = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	flex-direction: column;
	backdrop-filter: blur(10px);
	padding: 3rem 1rem;
	${mixins.flex({posOne: "normal", posTwo: "center"})};

	.tab-header {
		position: relative;
		text-align: center;
		padding: 2rem;
		margin: 1rem 2rem;

		&__h1 {
			padding-left: 3rem;
			text-align: left;
			font-size: 3rem;
			font-weight: 400;
			color: white;
		}

		&__button {
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			background: transparent;
			border: none;
		}
	}

	.cities-list {
		flex-grow: 1;
		overflow-y: auto;
		overflow-x: hidden;
		margin-bottom: 2rem;

		&__city {
			position: relative;
			overflow: hidden;
			margin: 1.3rem 1rem;
			font-size: 2rem;
			padding: 1.5rem 2rem;
			background: rgba(0, 0, 0, 0.15);
			color: white;
			cursor: pointer;
			box-shadow: -2px 2px 2px 0 rgba(0, 0, 0, 0.25);
			border-radius: 0.5rem;
			${mixins.flex({posOne: "center", posTwo: "space-between"})}
		}
	}

	.cities-options {
		${mixins.flex({posOne: "center", posTwo: "center"})}
		margin: .5rem;

		&__button {
			position: realative;
			width: 64px;
			height: 64px;
		}
	}

	.delete-section {
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;

		&__button {
			border: none;
			background: none;
			width: 45px;
			height: 100%;
			&:active {
				background: rgba(255, 255, 255, 0.05);
			}
		}
	}
`;

export default MenuSectionsBaseStyle;
