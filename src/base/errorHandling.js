/* eslint-disable no-console */
let noOfInstances = 0;
let isEnabled = true;

export const Log = new function() {
	noOfInstances += 1;
	console.log(`%c Logging initialised :: Instance #${ noOfInstances } :: ${ isEnabled ? "ENABLED" : "DISABLED" }`,
		`background-color: black; color: ${ isEnabled ? "limegreen" : "red" }`);
	
	const Validate = (str) => {
		if (str === null) throw new Error("**** ERROR in Log class, mandatory str variable missing. Trace:");
		if (str === "") throw new Error("**** ERROR in Log class, passed empty string \"\". Trace:");
		return (isEnabled);
	};

	//________________________________________ OBJECTS ________________________________________
	this.ObjectEntries = (obj) => {
		if (Object.keys(obj).length === 0) throw new Error("Log.ObjectEntries passed an empty object.");
		
		const str = Object.entries(obj).map((entry, idx) => {
			const [ key, value ] = entry;
			return(
				`[${ idx }] [${ key }]  ${ value }`
			);
		}).join("\n ");
		
		console.log(`%c ${ str }`, "background-color: black; color: violet;");
	};

	//________________________________________ STANDARD ________________________________________
	this.Alert = (str = null) => {
		Validate(str);
		console.log(`%c [Alert]             ${ str }`, "background-color: orangered; color: black; font-size: 20px;");
	};
	
	this.Attempt = (str = null) => {
		Validate(str);
		console.log(`%c ${ str }`, "background-color: orange; color: black;");
	};
	
	this.Constructor = (str = null) => {
		Validate(str);
		console.log(`%c [Instantiated]      ${ str }`, "background-color: black; color: white;");
	};

	this.Error = (str = null) => {
		Validate(str);
		console.log(`%c [Error]             ${ str }`, "background-color: red; color: white; font-size: 20px;");
	};

	this.EventListenerAdded = (str = null) => {
		Validate(str);
		console.log(`%c [++Event Listener]  ${ str }`, "background-color: black; color: green;");
	};

	this.EventListenerRemoved = (str = null) => {
		Validate(str);
		console.log(`%c [--Event Listener]  ${ str }`, "background-color: black; color: red;");
	};

	this.JSON = (obj) => {
		if (Object.keys(obj).length === 0) throw new Error("Log.JSON passed an empty object.");
		const str = JSON.stringify(obj, null, 4);
		Validate(str);
		console.log(`%c ${ str }`, "background-color: black; color: fuchsia;");
	};

	this.Linebreak = (str = null) => {
		Validate(str);
		console.log(`%c *******************${ str === "" ? "" : ` ${ str } ` }*******************`, "background-color: black; color: yellow;");
	};
	
	this.Message = (str = null) => {
		Validate(str);
		console.log(`%c ${ str }`, "background-color: white; color: black;");
	};

	this.Success = (str = null) => {
		Validate(str);
		console.log(`%c ${ str }`, "background-color: limegreen; color: black;");
	};
	
	this.Testing = (str = null) => {
		Validate(str);
		console.log(`%c [Testing]           ${ str }`, "background-color: orange; color: black; font-size: 20px;");
	};

	this.Warning = (str = null) => {
		Validate(str);
		console.log(`%c [WARNING]           ${ str }`, "background-color: orange; color: black; font-size: 20px;");
	};
	
	this.WithCustomStyle = (str = null, css = null) => {
		Validate(str);
		console.log(`%c ${ str }`, css);
	};

	//________________________________________ NETWORK ________________________________________
	this.ServerReq = (...str) => {
		console.log(str);
		Validate(str[0]);
		const container = "________________________________________";
		const outputStr =
			container +
			"\n|" +
			"\n|  Server request received" +
			"\n|" +
			"\n" + str.map(item => `|  ${ item }`).join("\n") +
			"\n|" + container;

		console.log(outputStr);
	};

	//________________________________________ REACT SPECIFIC ________________________________________
	this.Click = (str = null) => {
		Validate(str);
		console.log(`%c [Clicked]           ${ str }`, "background-color: black; color: skyblue;");
	};
	
	this.Mounted = (str = null) => {
		Validate(str);
		console.log(`%c [Mounted]           ${ str }`, "background-color: black; color: limegreen;");
	};
	
	this.MouseEnter	= (str = null) => {
		Validate(str);
		console.log(`%c [Mouse >> Entered]  ${ str }`, "background-color: black; color: green;");
	};

	this.MouseLeave = (str = null) => {
		Validate(str);
		console.log(`%c [Mouse << Left]     ${ str }`, "background-color: black; color: green;");
	};
	
	this.Render	= (str = null) => {
		Validate(str);
		console.log(`%c [Render]            ${ str }`, "background-color: black; color: pink;");
	};
	
	this.StateChange = (str = null) => {
		Validate(str);
		console.log(`%c [State Change]      ${ str }`, "background-color: black; color: fuchsia;");
	};
	
	this.ThemeUpdate = (str = null) => {
		Validate(str);
		console.log(`%c [Theme Update]      ${ str }`, "background-color: black; color: lightblue;");
	};

	this.Unmounted = (str = null) => {
		Validate(str);
		console.log(`%c [Unmounted]         ${ str }`, "background-color: black; color: red;");
	};
};
