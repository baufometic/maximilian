//*________________________________________ IMPORTS ________________________________________
//*__________ BASE __________
import { Random } from "./base/generators";
import { Log } from "./base/log";
import { MATH } from "./base/math";
import { OBJ } from "./base/objects";
import { MakeObservable } from "./base/observers";
import { STR } from "./base/strings";

//*__________ BROWSER __________
import { SetFullScreen, ToggleFullScreen } from "./browser/screen";

//*__________ COMPONENTS __________
import { DevDashboard } from "./components/DevDashboard";

//*__________ HOOKS __________
import {
	Media,
	useCookies,
	useMediaQueries,
	useMediaQueryCustom,
	useMousePosition,
	useScreen,
	useSensors
} from "./hooks";

//*__________ STYLING __________
import { palettes, GetRandomPalette } from "./styling/colours";
import { SASS } from "./styling/SASS";

//*__________ TYPINGS __________
import type {
	TLettersLowerCase,
	THexColour,
	TRGBAColour,
	TRGBColour
} from "./typings";

export {
	Random, Log, MATH, OBJ, MakeObservable, STR,
	SetFullScreen, ToggleFullScreen,
	DevDashboard,
	Media, useCookies, useMediaQueries, useMediaQueryCustom, useMousePosition, useScreen, useSensors,
	palettes, GetRandomPalette, SASS,
	TLettersLowerCase, THexColour, TRGBAColour, TRGBColour
};
