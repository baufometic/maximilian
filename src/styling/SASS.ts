import { css } from "styled-components"

const SASS = {
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
	
	//*____________________ GRID ____________________
	/**
	 * Create a CSS3 grid
	 * @property noOfRows
	 * @property noOfColumns
	 */
	gridFixed: ({ noOfColumns, noOfRows }: {
		noOfColumns: number;
		noOfRows: number;
	}) => {
		if (noOfRows <= 0 || noOfColumns <= 0) throw new RangeError("[SASS > Grid > CreateFixed] Passed params are outside outside range")
		return (css`
			display: grid;
			grid-template-rows: repeat(${ noOfRows }, 1fr);
			grid-template-columns: repeat(${ noOfColumns }, 1fr);
		`)
	},
	/**
	 * Append item to a CSS3 grid.
	 * Zero based unlikes CSS, adds +1 in the resulting CSS
	 * @property column index
	 * @property row index
	 * @property spanHeight in cells
	 * @property spanWidth in cells
	 */
	gridAppend: ({ row, column, spanHeight, spanWidth }: {
		column: number;
		row: number;
		spanHeight: number;
		spanWidth: number;
	}) => {
		if (row < 0 || column < 0 || spanHeight <= 0 || spanWidth <= 0) throw new RangeError("[SASS > Grid > Append] Passed params are outside outside range")
		return (css`
			grid-column: ${ column + 1 } / span ${ spanWidth };
			grid-row: ${ row + 1 } / span ${ spanHeight };
		`)
	},

	//*____________________ WINDOW MANIPULATION ____________________
	hideScrollbars: css`
		scrollbar-width: none; /* Firefox */
		&::-webkit-scrollbar {
			display: none; /* Chrome, Safari and Opera */
		}
		-ms-overflow-style: none; /* IE and Edge */
	`
}

Object.seal(SASS)
export { SASS }
