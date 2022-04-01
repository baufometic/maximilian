import { useEffect, useRef } from "react";
import { Log } from "../base/log";
/*================================================================================
END OF IMPORTS
================================================================================*/

//const isProd = (process.env.NODE_ENV === "production"); // TODO blocking for production - or limiting logs

type ComponentObject = {
	rawName: string;
	uniqueName: string;
	count: number;
}
type ComponentArray = Array<ComponentObject>;

const components: ComponentArray = [];

const IsValidComponentName = (name: string): boolean => {
	if (name === "") throw new Error("[ComponentManager] componentName passed is empty string");
	return true;
};
/*================================================================================
END OF COMPONENT NAME CHECKING
================================================================================*/

let mountedCount = 0, unmountedCount = 0, overallCount = 0;
const GetCountStr = () => (`mounted [${mountedCount}] | unmounted [${unmountedCount}] | overall [${overallCount}]`);

type AddComponentProps = {
	name: string;
	verbose?: boolean | "true" | "false";
};

const AddComponent = <T extends AddComponentProps>({ name, verbose=false }: T): string => {
	if (!IsValidComponentName(name)) throw new Error("Error setting component name within ComponentManager");

	// * Check if name already exists in the store
	let count = 0;
	if (components.findIndex(c => c.rawName === name) !== -1) {
		const filteredItems: ComponentArray = components.filter(c => c.rawName === name);
		const objWithMaxCount = filteredItems.reduce((prev, current) => (prev.count > current.count) ? prev : current);
		count = objWithMaxCount.count + 1;
	}

	const obj: ComponentObject = {
		rawName    : name,
		uniqueName : `[${count}] ${name}`,
		count      : count,
	};

	components.push(obj);

	// * Register Mounted
	mountedCount++;
	overallCount = mountedCount - unmountedCount;
	if (verbose) Log.Mounted(obj.uniqueName + "  " + GetCountStr());

	return obj.uniqueName;
};
/*================================================================================
END OF AddComponent
================================================================================*/

type RemoveComponentProps = {
	name: string;
	verbose?: boolean;
};

const RemoveComponent = <T extends RemoveComponentProps>({ name, verbose=false }: T): void => {
	const idx = components.findIndex(c => c.uniqueName === name);
	if (idx === -1) throw new Error("Error finding idx of componentName to remove in ComponentManager");
	else verbose && Log.Attempt(`Removing idx [${idx}] in ComponentManager`);

	components.splice(idx, 1);

	// * Register Unmounted
	unmountedCount++;
	overallCount = mountedCount - unmountedCount;
	if (verbose) Log.Unmounted(name + "  " + GetCountStr());
};
/*================================================================================
END OF RemoveComponent
================================================================================*/

type useComponentProps = {
	name: string,
	verbose?: boolean,
	onMountFunction?: () => unknown,
	onUnmountFunction?: () => unknown,
};

export const useComponent = <T extends useComponentProps>({ name, verbose=false, onMountFunction, onUnmountFunction }: T): void => {
	const myName = useRef<string>("");

	useEffect(() => {
		Log.Testing("Calling from useComponent initial []. I SHOULD NOT LOG MORE THAN ONCE!!");
		myName.current = AddComponent({ name, verbose });
		if (typeof onMountFunction === "function") onMountFunction();

		return () => {
			RemoveComponent({ name: myName.current, verbose });
			if (typeof onUnmountFunction === "function") onUnmountFunction();
		};
	}, [ name, verbose, onMountFunction, onUnmountFunction ]);

	useEffect(() => (Log.Render(myName.current)));
};
/*================================================================================

END OF FILE

================================================================================*/

