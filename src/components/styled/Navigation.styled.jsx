import styled from "styled-components";
import Navigation from "../Navigation";
import mixins from "./Mixins";

const StyledNavigation = styled(Navigation)`
	@keyframes makeBig {
		50% {
			transform: scale(2);
		}
		100% {
			transform: scale(1.7);
		}
	}

	${mixins.flex({posOne: "center", posTwo: "center"})}

	background: rgba(0,0,0,.3);
	box-shadow: 0 5px 5px 0 rgba(30, 30, 30, 0.25);
	border-radius: 0.75rem;
	padding: 1rem;
	z-index: 1;

	.menu {
		list-style: none;

		&__item {
			font-size: 2.5rem;
		}

		&__link {
			${mixins.flex({posOne: "center", posTwo: "flex-start"})}
			padding: 1.2rem 2rem;
			text-decoration: none;
			color: white;
			border-radius: 1.3rem;

			&:active {
				//* change to :active
				background: rgba(0, 0, 0, 0.15);

				&__svg {
					animation: makeBig 0.3s 0s ease forwards;
				}
			}
		}

		&__text {
			margin: 0 1rem;
		}

		&__icon {
			margin-right: 3rem;
		}

		&__svg {
			transform: scale(1.7);
			transition: transform 0.2s 0s ease;
		}
	}
`;

export default StyledNavigation;
