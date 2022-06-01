import { keyframes } from "styled-components"

const animations = {
	flashingText: keyframes`
		0%, 100% {
			color: #28D7FE;
			text-shadow:
				0 0 1vw #1041FF,
				0 0 3vw #1041FF,
				0 0 10vw #1041FF,
				0 0 10vw #1041FF,
				0 0 0.4vw #8BFDFE,
				0.5vw 0.5vw 0.1vw #147280;
		}
		50% {
			color: #146C80;
			text-shadow:
				0 0 0.5vw #082180,
				0 0 1.5vw #082180,
				0 0 5vw #082180,
				0 0 5vw #082180,
				0 0 0.2vw #082180,
				0.5vw 0.5vw 0.1vw #0A3940;
		}
	`	
}

Object.seal(animations)
export { animations }
