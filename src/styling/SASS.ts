import { css } from "styled-components";
import { TSass } from "./SASS.types";

export const SASS: TSass = {
	absoluteCentered: css`
		left: 50%;
		position: absolute;
		top: 50%;
		transform: translate3d(-50%, -50%, 0);
	`,

	//*____________________ SIZING ____________________
	fullsize: css`
		height: 100%;
		width: 100%;
	`,

	//*____________________ FLEX ____________________
	flexCenterColumn: css`
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	`,
	flexCenterRow: css`
		align-items: center;
		display: flex;
		flex-direction: row;
		justify-content: center;
	`,
	
	//*____________________ WINDOW MANIPULATION ____________________
	hideScrollbars: css`
		scrollbar-width: none; /* Firefox */
		&::-webkit-scrollbar {
			display: none; /* Chrome, Safari and Opera */
		}
		-ms-overflow-style: none; /* IE and Edge */
	`
};
