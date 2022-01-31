import styled from "styled-components";
import Loader from "../Loader";
import mixins from "./Mixins";

const StyledLoader = styled(Loader)`
	@keyframes rocking {
		0% {
			transform: translateY(-10px);
		}

		50% {
			transform: translateY(10px);
		}

		100% {
			transform: translateY(-10px);
		}
	}

	${mixins.flex({posOne: "center", posTwo: "center"})};
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100%;
	background: white;

	&__svg {
		transform: scale(5);
	}

	.loader {
		animation: rocking 3s 0s ease-in-out forwards infinite;
	}
`;

export default StyledLoader;
