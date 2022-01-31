import {createGlobalStyle} from "styled-components";
import mixins from "./Mixins";

const GlobalStyle = createGlobalStyle`
    @keyframes appearModal {
        100%{
            opacity: 1;
        }
    }

    @keyframes appearItem {
        0%{
            opacity: 0;
            transform: translateY(-10px);
        }

        50%{
            opacity: 1;
        }

        100%{
            transform: translateY(0);
        }
    }

    :root{
        font: 62.5% 'Ubuntu',sans-serif;
        scrollbar-color: hsl(197, 0%, 46%);
        scrollbar-width: thin;

        &::-webkit-scrollbar {
			width: 8px;
			height: 8px;
		}

		&::-webkit-scrollbar-track {
			background: rgba(0, 0, 0, 0);
			border-radius: 1rem;
		}

		&::-webkit-scrollbar-thumb {
			background: hsl(197, 0%, 46%);
			border-radius: 1rem;
		}

		&::-webkit-scrollbar-thumb:hover {
			background: hsl(197, 0%, 30%);
		}
    }

    *,*::before,*::after{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    .page{
        height: 100vh;
        overflow-x: hidden;
        background: white;

        &--sticked{
            overflow: hidden;
        }
    }

    .loaded{
        animation: appearItem 1s 0s forwards;
    }

    .background{
        position: relative;
        left: 50%;
        height: 100vh;
        transform: translate3d(0,0,0) translateX(-50%);

        ${mixins.media("landscape-large")`
            display: block;
            left: 0;
            width: 100vw;
            transform: translate3d(0,0,0) translate(0);
        `}

        ${mixins.media("desktop")`
            display: block;
            left: 0;
            width: 100vw;
            transform: translate3d(0,0,0) translate(0);
        `}
    }

    .second-background{
        position: absolute;
        width: 100%;
        top: 0;
        left: 50%;
        height: 100vh;
        transform: translateX(-50%);
        background: rgba(0,0,0,.15);
	}

    .option-button{
        ${mixins.flex({posOne: "center", posTwo: "center"})}
        border: none;
        background: rgba(0, 0, 0, 0.3);
        box-shadow: none;
        font-size: 1.45rem;
        padding: 1rem;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        transition: background .1s 0s ease;

            &:active{
                background:rgba(90,90,90,90%);
            }
        }

    .modal{
        ${mixins.flex({posOne: "center", posTwo: "center"})};
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        opacity: 0;
        padding: 1rem;
        backdrop-filter: blur(10px);
        animation: appearModal .5s 0s ease forwards;

            &__close{
                cursor: pointer;
                position: absolute;
                top: 0;
                right: 0;
                margin: 2rem;
                background: transparent;
                border: none;
            }

            &__window{
                ${mixins.flex({posOne: "center", posTwo: "center"})};
                flex-wrap: wrap;
                background: rgba(0,0,0,.25);
                padding: 2.5rem;
                box-shadow: 0 5px 5px 0 rgba(30,30,30,.25);
                border-radius: 1.25rem;
                max-width: 100%;
            }

            &__input{
                padding: 1rem;
                border-radius: .7rem;
                border: none;
                color: white;
                font-size: 1.5rem;
                font-weight: 500;
                background: rgba(255,255,255,.17);
                max-width: 100%;
                

                &:focus{
                    outline: none;
                }

                &::placeholder{
                    color: white;
                    font-weight: 500;
                }
            }

    }

    .svg{
        transform: scale(2);
        cursor: pointer;

        &--mini{
            transform: scale(1);
        }

        &__path{
            fill: white;
        }
    }

    .input-cnt {
        position: relative;
		display: flex;
		flex-direction: column;
        margin: 1rem;
	}

	.error-text {
        position: absolute;
        top: 100%;
        display: none;
		color: red;
		font-size: 1.2rem;
		padding-top: .5rem;

        &--show{
            display: block;
        }
	}

    .section-placeholder{
        display: block;
        text-align: center;
        width: 100%;
        color: hsla(0, 0%, 100%, 1);
        font-size: 3rem;
        margin: 1rem;
    }
`;

export default GlobalStyle;
