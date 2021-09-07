import { Palettes } from "./palettes";
const p = Palettes;

export const themeList = [
	{
		// ____________________ PETE CUSTOM ____________________
		name          : "petes-custom-theme",
		primaryColour : p.peteCustomA,
		background    : "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)",
		pageBorder    : "1px solid orange",
		titleColour   : p.peteCustomA,
		headerStyle   : (`
			background: radial-gradient(ellipse at top, ${ p.peteCustomD } 50%, #000 100%);
			border: 0;
			border-bottom-left-radius: 100px;
			border-bottom-right-radius: 100px;
			box-shadow: 0px -1px 20px ${ p.peteCustomA };
		`),
		footerStyle: (`
			background: radial-gradient(ellipse at bottom, ${ p.peteCustomD } 50%, #000 100%);
			border: 0;
			border-top-left-radius: 100px;
			border-top-right-radius: 100px;
			box-shadow: 0px -1px 20px ${ p.peteCustomA };
		`),
	},
	{
		// ____________________ LIGHT ____________________
		name          : "light",
		primaryColour : "black",
		background    : "white",
		titleColour   : p.tronWhite2,
		pageBorder    : "1px solid grey",
		headerStyle   : (`
			background: radial-gradient(ellipse at top, ${ p.tronWhite2 } 50%, #000 100%);
			border: 0;
			border-bottom-left-radius: 100px;
			border-bottom-right-radius: 100px;
			box-shadow: 0px -1px 20px ${ p.tronBlack2 };
		`),
		footerStyle: (`
			background: radial-gradient(ellipse at bottom, ${ p.tronWhite2 } 50%, #000 100%);
			border: 0;
			border-top-left-radius: 100px;
			border-top-right-radius: 100px;
			box-shadow: 0px -1px 20px ${ p.tronBlack2 };
		`)
	},
	{
		// ____________________ DARK ____________________
		name          : "dark",
		primaryColour : "white",
		background    : "black",
		titleColour   : "orange",
		pageBorder    : "1px solid white",
		headerStyle   : (`
			background: radial-gradient(ellipse at top, ${ p.tronBlack2 } 50%, #000 100%);
			border: 0;
			border-bottom-left-radius: 100px;
			border-bottom-right-radius: 100px;
			box-shadow: 0px -1px 20px ${ p.tronWhite2 };
		`),
		footerStyle: (`
			background: radial-gradient(ellipse at bottom, ${ p.tronBlack2 } 50%, #000 100%);
			border: 0;
			border-top-left-radius: 100px;
			border-top-right-radius: 100px;
			box-shadow: 0px -1px 20px ${ p.tronWhite2 };
		`)
	},
	{
		//____________________ RANDOMLY GENERATED ____________________
		name: "random",
		get primaryColour() {
			return(p.RandomColour());
		},
		get background() {
			return(p.RandomColour());
		},
		get titleColour() {
			return(p.RandomColour());
		},
		get pageBorder() {
			return(`1px solid ${ p.RandomColour() }`);
		},
		get headerStyle() {
			return(`
				background: radial-gradient(ellipse at top, ${ p.RandomColour() } 50%, ${ p.RandomColour() } 100%);
				border: 0;
				border-bottom-left-radius: 100px;
				border-bottom-right-radius: 100px;
				box-shadow: 0px -1px 20px ${ p.RandomColour() };
				color: ${ p.RandomColour() };
			`);
		},
		get footerStyle() {
			return(`
				background: radial-gradient(ellipse at bottom, ${ p.RandomColour() } 50%, ${ p.RandomColour() } 100%);
				border: 0;
				border-top-left-radius: 100px;
				border-top-right-radius: 100px;
				box-shadow: 0px -1px 20px ${ p.RandomColour() };
			`);
		}
	}
];
