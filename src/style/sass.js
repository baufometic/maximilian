import { css } from "styled-components";
import { Log } from "../base/errorHandling";

export const SASS = new function() {
	Log.Constructor("SASS");

	let devHasBeenAlerted = false;
	const WARN_DEVELOPER = () => {
		if (!devHasBeenAlerted) {
			Log.Warning("!!  DEV STYLE OVERRIDES ACTIVE  !!");
			devHasBeenAlerted = true;
		}
	};
	
	this.Debug = {
		get Wireframe() {
			WARN_DEVELOPER();
			return (css`
				* {
					border: 1px dotted orange !important;
				}
			`);
		},

		get HideHeaderAndFooter() {
			WARN_DEVELOPER();
			return (css`
				header { display: none !important; }
				footer { display: none !important; }
			`);
		},
	};

	this.Size = {
		get Full() {
			return (css`
				height: 100%;
				width: 100%;
			`);
		},
	};

	this.Position = {
		get CentreFlex() {
			return (css`
				align-items: center;
				display: flex;
				justify-content: center;
			`);
		},
	};

	this.HideScrollbars = function get() {
		return (css`
			scrollbar-width: none; // firefox
			::-webkit-scrollbar { display: none; } // Chrome, Safari and Opera
			-ms-overflow-style: none; //IE and Edge
		`);
	};

	this.Glass = {
		get active() {
			return (css`
				background-color: rgba(0, 222, 255, 0.075);
				box-shadow: rgba(255, 255, 255, 0.3) 2px 5px 8px;
				border-color: rgba(255, 255, 255, 0.4) rgba(22, 233, 220, 0.65) rgba(22, 233, 220, 0.65) rgba(255, 255, 255, 0.4);
				border-style: solid;
				border-width: 2px;
				border-image: none 100% / 1 / 0 stretch;
				border-radius: 11px;
			`);
		},
		get inactive() {
			return (css`
				background-color: rgba(0, 222, 255, 0.075);
				box-shadow: rgba(255, 255, 255, 0.3) 2px 5px 8px;
				border-color: rgba(255, 255, 255, 0.4) rgba(40, 40, 40, 0.35) rgba(40, 40, 40, 0.35) rgba(255, 255, 255, 0.4);
				border-style: solid;
				border-width: 2px;
				border-image: none 100% / 1 / 0 stretch;
				border-radius: 11px;
			`);
		},
	};

	this.Grid = {
		/**
		* Creates a fixed sized CSS grid
		* @property {integer} rows - no of rows
		* @property {integer} columns - no of columns
		* @returns {string} literal CSS. repeat(1fr, rows) repeat(1fr, columns)
		*/
		Create(rows = 0, columns = 0) {
			if (rows.isNaN || columns.isNaN) throw new Error("Grid.Create params Nan");
			if (rows <= 0 || columns <= 0) throw new Error("Grid.Create params outside range. >100? <0?");
			return (css`
				display: grid;
				grid-template-rows: repeat(${ rows }, 1fr);
				grid-template-columns: repeat(${ columns }, 1fr);
			`);
		},

		/**
		* Appends a div to specified row/column, with given height/width for use in a CSS3 grid
		* @property {integers} row and column - zero based for JS sake (but CSS uses 1)
		* @property {integers} width and height - cell size in grid
		* @returns {string} literal CSS. grid-column grid-row
		*/
		Append(row = -1, column = -1, width = 0, height = 0) {
			if (row.isNaN || column.isNaN || width.isNaN || height.isNaN) throw new Error("Grid.Append params isNaN");
			if (row < 0 || column < 0 || width < 1 || height < 1) {
				throw new RangeError("Grid.Append vars outside range");
			}
			return (css`
				grid-column: ${ column + 1 } / span ${ height };
				grid-row: ${ row + 1 } / span ${ width };
			`);
		},
	};
};
