/* eslint-disable no-console */

const BASE_STYLE = `
	border-radius: 5px;
	padding: 3px;
`;

const REACT_STYLE = (colour: string) => `
	${ BASE_STYLE };
	background-color: rgb(12,20,31);
	border: 1px solid ${ colour };
	color: ${ colour };
`;

const REGULAR_STYLE = (colour: string) => `
	${ BASE_STYLE };
	background-color: black;
	color: ${ colour };
`;

const Log = {
	//!__________ TOGGLE LOGGING __________
	__proceed: true,
	set verbose(bool: boolean) {
		console.log(`[Log] verbosity has been set to ${ bool }`);
		this.__proceed = bool;
	},
	get verbose() {
		return this.__proceed;
	},

	//________________________________________ OBJECTS ________________________________________
	JSON: function(obj: object): void {
		if (!this.__proceed) return;
		console.log("%c" + JSON.stringify(obj, null, 4), "background-color: black; color: fuchsia;");
	},
	ObjectEntries: function(obj: object): void {
		if (!this.__proceed) return;
		const str = Object.entries(obj).map((entry, idx) => {
			const [ key, value ] = entry;
			return `[${ idx }] [${ key }]  ${ value }`;
		}).join("\n ");
		console.log("%c" + str, "background-color: black; color: violet;");
	},

	//________________________________________ NETWORK ________________________________________
	ServerReq: function(str: string[]): void {
		if (!this.__proceed) return;
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
	EventListenerAdded: function(str: string): void {
		if (!this.__proceed) return;
		console.log("%c[++Event Listener]  " + str, "background-color: black; color: limegreen;");
	},
	EventListenerRemoved: function(str: string): void {
		if (!this.__proceed) return;
		console.log("%c[--Event Listener]  " + str, "background-color: black; color: red;");
	},

	//________________________________________ STANDARD ________________________________________
	Attempt: function(str: string): void {
		if (!this.__proceed) return;
		console.log("%c" + str, "background-color: orange; color: black; font-style: italic; padding: 5px;");
	},
	Constructor: function(str: string): void {
		if (!this.__proceed) return;
		console.log("%c[Instantiated]      " + str, "background-color: black; color: white;");
	},
	Linebreak: function(str?: string): void {
		if (!this.__proceed) return;
		console.log("%c******************* " + str + " *******************", "background-color: black; color: yellow;");
	},
	Message: function(str: string): void {
		if (!this.__proceed) return;
		console.log("%c" + str, "background-color: white; color: black;");
	},
	Success: function(str: string): void {
		if (!this.__proceed) return;
		console.log(`%c✅  ${ str }`, REGULAR_STYLE("limegreen"));
	},
	Testing: function(data: unknown): void {
		if (!this.__proceed) return;
		if (typeof data === "object") {
			data = JSON.stringify(data, null, 3);
		}
		console.log("%c[Testing]           " + data, "background-color: orange; color: black; font-size: 12px;");
	},
	Warning: function(str: string): void {
		if (!this.__proceed) return;
		console.log("%c[WARNING]           " + str, "background-color: orangered; color: black; font-size: 12px;");
	},
	WithCustomStyle: function(str: string, css: string): void {
		if (!this.__proceed) return;
		console.log("%c" + str, css);
	},

	//________________________________________ REACT SPECIFIC ________________________________________
	Click: function(str: string): void {
		if (!this.__proceed) return;
		console.log("%c[Clicked]           " + str, REACT_STYLE("skyblue"));
	},
	Mounted: function(str: string): void {
		if (!this.__proceed) return;
		console.log("%c[Mounted]           " + str, REACT_STYLE("limegreen"));
	},
	MouseEnter: function(str: string): void {
		if (!this.__proceed) return;
		console.log("%c[Mouse >> Entered]  " + str, REACT_STYLE("blue"));
	},
	MouseLeave: function(str: string): void {
		if (!this.__proceed) return;
		console.log("%c[Mouse << Left]     " + str, REACT_STYLE("blue"));
	},
	Render: function(str: string): void {
		if (!this.__proceed) return;
		console.log("%c[Render]            " + str, REACT_STYLE("pink"));
	},
	StateChange: function(data: unknown, whatChanged: string ): void {
		if (!this.__proceed) return;
		if (typeof data === "object") {
			data = JSON.stringify(data, null, 3);
		}
		console.log("%c[State Change]      " + whatChanged, REACT_STYLE("white"));
		console.log("%c" + data, "border: 1px solid black; border-radius: 3px;");
	},
	ThemeUpdate: function(str: string): void {
		if (!this.__proceed) return;
		console.log("%c[Theme Update]      " + str, REACT_STYLE("pink"));
	},
	Unmounted: function(str: string): void {
		if (!this.__proceed) return;
		console.log("%c[Unmounted]         " + str, REACT_STYLE("orange"));
	}
};

export { Log };
