/* eslint-disable no-console */

const Log = {
	//________________________________________ OBJECTS ________________________________________
	JSON: (obj: object): void => {
		console.log("%c " + JSON.stringify(obj, null, 4), "background-color: black; color: fuchsia;");
	},
	ObjectEntries: (obj: object): void => {
		const str = Object.entries(obj).map((entry, idx) => {
			const [ key, value ] = entry;
			return `[${idx}] [${key}]  ${value}`;
		}).join("\n ");

		console.log("%c " + str, "background-color: black; color: violet;");
	},

	//________________________________________ NETWORK ________________________________________
	ServerReq: (str: string[]): void => {
		const container = "________________________________________";
		const outputStr = container +
			"\n|" +
			"\n|  Server request received" +
			"\n|" +
			"\n" + str.map(item => `|  ${item}`).join("\n") +
			"\n|" + container;
		console.log(outputStr);
	},

	//________________________________________ STANDARD ________________________________________
	Alert: (str: string): void => {
		console.log("%c [Alert]             " + str, "background-color: orangered; color: black;");
	},
	Attempt: (str: string): void => {
		console.log("%c " + str, "background-color: orange; color: black;");
	},
	Constructor: (str: string): void => {
		console.log("%c [Instantiated]      " + str, "background-color: black; color: white;");
	},
	EventListenerAdded: (str: string): void => {
		console.log("%c [++Event Listener]  " + str, "background-color: black; color: green;");
	},
	EventListenerRemoved: (str: string): void => {
		console.log("%c [--Event Listener]  " + str, "background-color: black; color: red;");
	},
	Linebreak: (str?: string): void => {
		console.log("%c ******************* " + str + " *******************", "background-color: black; color: yellow;");
	},
	Message: (str: string): void => {
		console.log("%c " + str, "background-color: white; color: black;");
	},
	Success: (str: string): void => {
		console.log("%c " + str, "background-color: limegreen; color: black;");
	},
	Testing: (str: string): void => {
		console.log("%c [Testing]           " + str, "background-color: orange; color: black; font-size: 20px;");
	},
	Warning: (str: string): void => {
		console.log("%c [WARNING]           " + str, "background-color: orange; color: black; font-size: 20px;");
	},
	WithCustomStyle: (str: string, css: string): void => {
		console.log("%c " + str, css);
	},

	//________________________________________ REACT SPECIFIC ________________________________________
	Click: (str: string): void => {
		console.log("%c [Clicked]           " + str, "background-color: black; color: skyblue;");
	},
	Mounted: (str: string): void => {
		console.log("%c [Mounted]           " + str, "background-color: black; color: limegreen;");
	},
	MouseEnter: (str: string): void => {
		console.log("%c [Mouse >> Entered]  " + str, "background-color: black; color: green;");
	},
	MouseLeave: (str: string): void => {
		console.log("%c [Mouse << Left]     " + str, "background-color: black; color: green;");
	},
	Render: (str: string): void => {
		console.log("%c [Render]            " + str, "background-color: black; color: pink;");
	},
	StateChange: (str: string): void => {
		console.log("%c [State Change]      " + str, "background-color: black; color: fuchsia;");
	},
	ThemeUpdate: (str: string): void => {
		console.log("%c [Theme Update]      " + str, "background-color: black; color: lightblue;");
	},
	Unmounted: (str: string): void => {
		console.log("%c [Unmounted]         " + str, "background-color: black; color: orange;");
	},
};

Object.seal(Log);
export { Log };
