/* eslint-disable no-console */

const __BASE_STYLE = `
	border-radius: 5px;
	padding: 3px;
`;

const REACT_STYLE = (colour: string) => `
	${ __BASE_STYLE };
	background-color: rgb(12,20,31);
	border: 1px solid ${ colour };
	color: ${ colour };
`;

const REGULAR_STYLE = (colour: string) => `
	${ __BASE_STYLE };
	background-color: black;
	color: limegreen;
`;

const Log = {
	//________________________________________ OBJECTS ________________________________________
	JSON: (obj: object): void => {
		console.log("%c" + JSON.stringify(obj, null, 4), "background-color: black; color: fuchsia;");
	},
	ObjectEntries: (obj: object): void => {
		const str = Object.entries(obj).map((entry, idx) => {
			const [ key, value ] = entry;
			return `[${ idx }] [${ key }]  ${ value }`;
		}).join("\n ");

		console.log("%c" + str, "background-color: black; color: violet;");
	},

	//________________________________________ NETWORK ________________________________________
	ServerReq: (str: string[]): void => {
		const container = "________________________________________";
		const outputStr = container +
			"\n|" +
			"\n|  Server request received" +
			"\n|" +
			"\n" + str.map(item => `|  ${ item }`).join("\n") +
			"\n|" + container;
		console.log(outputStr);
	},

	//________________________________________ EVENTS ________________________________________
	EventListenerAdded: (str: string): void => {
		console.log("%c[++Event Listener]  " + str, "background-color: black; color: green;");
	},
	EventListenerRemoved: (str: string): void => {
		console.log("%c[--Event Listener]  " + str, "background-color: black; color: red;");
	},

	//________________________________________ STANDARD ________________________________________
	Attempt: (str: string): void => {
		console.log("%c" + str, "background-color: orange; color: black; font-style: italic; padding: 5px;");
	},
	Constructor: (str: string): void => {
		console.log("%c[Instantiated]      " + str, "background-color: black; color: white;");
	},
	Linebreak: (str?: string): void => {
		console.log("%c******************* " + str + " *******************", "background-color: black; color: yellow;");
	},
	Message: (str: string): void => {
		console.log("%c" + str, "background-color: white; color: black;");
	},
	Success: (str: string): void => {
		console.log(`%c✅  ${ str }`, REGULAR_STYLE("limegreen"));
	},
	Testing: (data: unknown): void => {
		if (typeof data === "object") {
			data = JSON.stringify(data, null, 3);
		}
		console.log("%c[Testing]           " + data, "background-color: orange; color: black; font-size: 12px;");
	},
	Warning: (str: string): void => {
		console.log("%c[WARNING]           " + str, "background-color: orangered; color: black; font-size: 12px;");
	},
	WithCustomStyle: (str: string, css: string): void => {
		console.log("%c" + str, css);
	},

	//________________________________________ REACT SPECIFIC ________________________________________
	Click: (str: string): void => {
		console.log("%c[Clicked]           " + str, REACT_STYLE("skyblue"));
	},
	Mounted: (str: string): void => {
		console.log("%c[Mounted]           " + str, REACT_STYLE("limegreen"));
	},
	MouseEnter: (str: string): void => {
		console.log("%c[Mouse >> Entered]  " + str, REACT_STYLE("blue"));
	},
	MouseLeave: (str: string): void => {
		console.log("%c[Mouse << Left]     " + str, REACT_STYLE("blue"));
	},
	Render: (str: string): void => {
		console.log("%c[Render]            " + str, REACT_STYLE("pink"));
	},
	StateChange: (data: unknown, whatChanged: string ): void => {
		console.log("%c[State Change]" + whatChanged, REACT_STYLE("white"));
		console.log(data);
	},
	ThemeUpdate: (str: string): void => {
		console.log("%c[Theme Update]      " + str, REACT_STYLE("pink"));
	},
	Unmounted: (str: string): void => {
		console.log("%c[Unmounted]         " + str, REACT_STYLE("orange"));
	},
};

Object.seal(Log);
export { Log };
