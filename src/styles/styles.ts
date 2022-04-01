import { css } from "styled-components";

const SASS = {
	fullsize: css`
		height: 100%;
		width: 100%;
	`,
	flex: {
		center: css`
			align-items: center;
			display: flex;
			justify-content: center;
		`,
	},
	grid: {
		/**
		 * Create a CSS3 grid
		 * @property noOfRows, noOfColumns - number >= 1
		 */
		CreateFixed0: (noOfRows: number, noOfColumns: number) => {
			if (noOfRows <= 0 || noOfColumns <= 0) throw new RangeError("[SASS > Grid > CreateFixed] Passed params are outside outside range");
			// TODO test to see this implements correctly
			return (css`
				grid-template-rows: repeat(${ noOfRows }, 1fr);
				grid-template-columns: repeat(${ noOfColumns }, 1fr);
			`);
		},
		/**
		 * Append item to a CSS3 grid
		 * @property row, column - position in grid, >= 1
		 * @property spanHeight, spanWidth - portion of grid to span, >= 1
		 */
		Append: (row: number, column: number, spanHeight: number, spanWidth: number) => {
			if (row < 1 || column < 1 || spanHeight < 1 || spanWidth < 1) throw new RangeError("[SASS > Grid > Append] Passed params are outside outside range");
			// TODO test this to see if spanHeight x spanWidth are in the right order
			return (css`
				grid-column: ${ column } / span ${ spanHeight };
				grid-row: ${ row } / span ${ spanWidth };
			`);
		},
	},
	hideScrollbars: css`
		// Firefox
		scrollbar-width: none;
		// Chrome, Safari and Opera
		&::-webkit-scrollbar {
			display: none;
		}
		// IE and Edge
		-ms-overflow-style: none;
	`,
};

Object.seal(SASS);
export { SASS };
