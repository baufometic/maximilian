import React, { useRef } from "react";

type T_fontList =
	"aldrich" | "alegreya" | "bitter" | "cairo" | "exo" |
	"exo2" | "heebo" | "inter" | "lobster" | "majorMono" |
	"mukta" | "offside" | "orbitron" | "poppins" | "ptMono" |
	"rajdhani" | "raleway" | "vibur";
	
type T_fonts = Readonly<{
	[fontName in T_fontList]: {
		urlCode: `family=${string}`;
		usageStr: `font-family: '${string}', ${string};`;
		hasBeenLoaded: boolean;
	}
}>;

const fonts: T_fonts = {
	aldrich: {
		urlCode       : "family=Aldrich",
		usageStr      : "font-family: 'Aldrich', sans-serif;",
		hasBeenLoaded : false,
	},
	alegreya: {
		urlCode       : "family=Alegreya+Sans:wght@300",
		usageStr      : "font-family: 'Alegreya', sans-serif;",
		hasBeenLoaded : false,
	},
	bitter: {
		urlCode       : "family=Bitter",
		usageStr      : "font-family: 'Bitter', serif;",
		hasBeenLoaded : false,
	},
	cairo: {
		urlCode       : "family=Cairo:wght@200;300",
		usageStr      : "font-family: 'Cairo', sans-serif;",
		hasBeenLoaded : false,
	},
	exo: {
		urlCode       : "family=Exo",
		usageStr      : "font-family: 'Exo', sans-serif;",
		hasBeenLoaded : false,
	},
	exo2: {
		urlCode       : "family=Exo+2:wght@600",
		usageStr      : "font-family: 'Exo 2', sans-serif;",
		hasBeenLoaded : false,
	},
	heebo: {
		urlCode       : "family=Heebo",
		usageStr      : "font-family: 'Heebo', sans-serif;",
		hasBeenLoaded : false,
	},
	inter: {
		urlCode       : "family=Inter",
		usageStr      : "font-family: 'Inter', sans-serif;",
		hasBeenLoaded : false,
	},
	lobster: {
		urlCode       : "family=Lobster",
		usageStr      : "font-family: 'Lobster', cursive;",
		hasBeenLoaded : false,
	},
	majorMono: {
		urlCode       : "family=Major+Mono+Display",
		usageStr      : "font-family: 'Major Mono Display', monospace;",
		hasBeenLoaded : false,
	},
	mukta: {
		urlCode       : "family=Mukta",
		usageStr      : "font-family: 'Mukta', sans-serif;",
		hasBeenLoaded : false,
	},
	offside: {
		urlCode       : "family=Offside",
		usageStr      : "font-family: 'Offside', cursive;",
		hasBeenLoaded : false,
	},
	orbitron: {
		urlCode       : "family=Orbitron",
		usageStr      : "font-family: 'Orbitron', sans-serif;",
		hasBeenLoaded : false,
	},
	poppins: {
		urlCode       : "family=Poppins",
		usageStr      : "font-family: 'Poppins', sans-serif;",
		hasBeenLoaded : false,
	},
	ptMono: {
		urlCode       : "family=PT+Mono",
		usageStr      : "font-family: 'PT Mono', monospace;",
		hasBeenLoaded : false,
	},
	rajdhani: {
		urlCode       : "family=Rajdhani",
		usageStr      : "font-family: 'Rajdhani', sans-serif;",
		hasBeenLoaded : false,
	},
	raleway: {
		urlCode       : "family=Raleway",
		usageStr      : "font-family: 'Raleway', sans-serif;",
		hasBeenLoaded : false,
	},
	vibur: {
		urlCode       : "family=Vibur",
		usageStr      : "font-family: 'Vibur', cursive;",
		hasBeenLoaded : false,
	},
};

Object.seal(fonts);

const FontGetterComponent: React.FC<{ fontNames: Array<keyof typeof fonts> }> = ({ fontNames }) => {
	const fontRefURL = useRef<string>("");

	if (!fontRefURL.current) {
		const URLCodesArr = fontNames.map(name => fonts[name].urlCode);
		const joinedURLCodes = URLCodesArr.map(code => code).join("&");
		fontRefURL.current = `@import url(https://fonts.googleapis.com/css2?${ joinedURLCodes }&display=swap)`;
	}

	return <style>{ fontRefURL.current }</style>;
};

export {
	fonts,
	FontGetterComponent
};