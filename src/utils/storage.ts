/* eslint-disable no-console */
import { Log } from "../base/log";

let storageInitialised = false;
const InitCheckpoint = () => {
	if (!storageInitialised) {
		Log.Warning("Storage unavailable");
		return false;
	}
	return true;
};

// TODO check console log for web storage initialisation
(() => {
	Log.Attempt("Initialising web storage");
	const storageAvailable = (type: "localStorage" | "sessionStorage"): boolean | undefined => {
		let storage;
		try {
			storage = window[type];
			storage.setItem("testItem", "testData");
			if (storage.getItem("testItem") !== null) {
				storage.removeItem("testItem");
				return true;
			}
			return false;
		} catch (e) {
			return (
				e instanceof DOMException &&
				(e.code === 22 || // everything except Firefox
					e.code === 1014 || // Firefox
					e.name === "QuotaExceededError" || // test name field too, because code might not be present // everything except Firefox
					e.name === "NS_ERROR_DOM_QUOTA_REACHED") && // Firefox
				storage &&
				storage.length !== 0
			); // acknowledge QuotaExceededError only if there's something already stored
		}
	};

	if (storageAvailable("localStorage") && storageAvailable("sessionStorage")) {
		Log.Success("Web storage available.");
		storageInitialised = true;
	} else {
		Log.Warning("No web storage available.");
	}
})();

//________________________________________ STORAGE METHODS ________________________________________
type historyObjType = {
	item: string;
	data: string;
};

type History = {
	items: Array<historyObjType>;
	Add: (obj: historyObjType) => void;
	lastItemAdded: historyObjType;
};

const History: History = {
	items : [],
	Add   : function(obj) {
		this.items.push(obj);
	},
	get lastItemAdded() {
		return this.items[this.items.length - 1];
	},
};

type storageTypes = "sessionStorage" | "localStorage";
type Actions = {
	AddItem: (storageType: storageTypes, item: string, data: string) => void;
	RemoveItem: (storageType: storageTypes, item: string) => void;
	RetrieveItem: (storageType: storageTypes, item: string) => string;
};

// * Data is always stored as string. Convert if needed. eg 'name' and 'Aristo Alexander'
const Actions: Actions = {
	AddItem: (storageType, item, data) => {
		if (!InitCheckpoint()) return;
		const s = window[storageType];
		s.setItem(item, data);
		if (s.getItem(item)) {
			Log.Success(`[${storageType}] Item added: ${item} | ${data}`);
			History.Add({ item, data });
		} else {
			Log.Warning(`[${storageType}] Item not added: ${item} | ${data}`);
		}
	},
	RemoveItem: (storageType, item) => {
		if (!InitCheckpoint()) return;
		const s = window[storageType];
		s.removeItem(item);
		if (s.getItem(item)) Log.Success(`[${storageType}] Item removed: ${item}`);
		else Log.Warning(`[${storageType}] Item not removed: ${item}`);
	},
	RetrieveItem: (storageType, item) => {
		if (!InitCheckpoint()) return "";
		const s = window[storageType];
		const retrievedData: string | null = s.getItem(item);
		if (retrievedData) {
			Log.Success(`[${storageType}] Item [${item}] retrieved: ${retrievedData}`);
			return retrievedData;
		} else {
			Log.Warning(`[${storageType}] Item not found: ${item}`);
			return "";
		}
	},
};

//Record<"Session" | "Local", { methods }>;
type Storage = {
	Local: {
		/** Add an item to local storage */
		Add: (item: string, data: string) => void;
		/** Remove an item from local storage */
		Remove: (item: string) => void;
		/** Get an item from local storage */
		Get: (item: string) => string;
	},
	Session: {
		/** Add an item to session storage */
		Add: (item: string, data: string) => void;
		/** Remove an item from sessionstorage */
		Remove: (item: string) => void;
		/** Get an item from session storage */
		Get: (item: string) => string;
	}
};

const Storage: Storage = {
	// * LOCAL STORAGE: Kept until browser cache is deleted
	Local: {
		Add    : (item, data) => { Actions.AddItem("localStorage", item, data); },
		Remove : (item) => { Actions.RemoveItem("localStorage", item); },
		Get    : (item) => Actions.RetrieveItem("localStorage", item),
	},

	// * SESSION STORAGE: Lost when tab is closed
	Session: {
		Add    : (item, data) => { Actions.AddItem("sessionStorage", item, data); },
		Remove : (item) => { Actions.RemoveItem("sessionStorage", item); },
		Get    : (item) => Actions.RetrieveItem("sessionStorage", item),
	},
};

Object.seal(Storage);
export { Storage };
/*================================================================================

END OF FILE

================================================================================*/

