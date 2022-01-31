import {css} from "styled-components";

const flex = ({posOne, posTwo}) => css`
	display: flex;
	align-items: ${posOne};
	justify-content: ${posTwo};
`;

const device = {
	"landscape-large": `(orientation: landscape)`,
	"phone-mini": `(max-width: 330px)`,
	tablet: `(min-width: 550px)`,
	"tablet-large": `(min-width: 1024px)`,
	desktop: `(min-width: 1366px)`,
	"desktop-large": `(min-width: 1920px)`
};

const media = breakpoint => {
	return style => css`
		@media screen and ${device[breakpoint]} {
			${style}
		}
	`;
};

const mixins = {
	flex,
	media,
	device
};

export default mixins;
