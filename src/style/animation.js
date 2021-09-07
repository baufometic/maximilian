import { css, keyframes } from "styled-components";

export const Animation = new function() {
	this.blink = css`
		78% {
			color: inherit;
			text-shadow: inherit;
		}
		79% {
			color: #333;
		}
		80% {
			text-shadow: none;
		}
		81% {
			color: inherit;
			text-shadow: inherit;
		}
		82% {
			color: #333;
			text-shadow: none;
		}
		83% {
			color: inherit;
			text-shadow: inherit;
		}
		92% {
			color: #333;
			text-shadow: none;
		}
		92.5% {
			color: inherit;
			text-shadow: inherit;
		}
	`;

	this.boxEffect = css`
		from {
		    background-color: rgba(12,20,31, 0.3);
		    border: 1px solid rgba(orange, 0.5);
		}
		to {
		    background-color: rgba(122,20,31, 1);
		    border: 1px solid orange;
		}
	`;
	
	this.backLight = (xPos, yPos, spread, size, colorA, colorB, duration) => {
		const animGlow = keyframes`
			0% { background-position: 0% 50%; }
			50% { background-position: 100% 50%; }
			100% { background-position: 0% 50%; }
		`;

		return(css`
			&:after {
				position: absolute;
				content: "";
				top: ${ yPos };
				left: ${ xPos };
				right: 0;
				height: 50%;
				width: 50%;
				margin: 0 auto;
				transform: scale(${ size });
				filter: blur(${ spread });
				background: linear-gradient(270deg, ${ colorA }, ${ colorB });
				background-size: 200% 200%;
				animation: ${ animGlow } ${ duration } ease infinite;
			}
		`);
	};
};
