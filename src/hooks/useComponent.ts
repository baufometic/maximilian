import { useEffect, useRef } from "react";
import { Log } from "../index";

//const isProd = (process.env.NODE_ENV === "production"); // TODO blocking for production - or limiting logs

type T_componentObject = {
	rawName: string;
	uniqueName: string;
	count: number;
}
const components: T_componentObject[] = [];

const IsValidComponentName = (name: string): boolean => {
	if (name === "") throw new Error("[ComponentManager] componentName passed is empty string");
	return true;
};
/*================================================================================
END OF COMPONENT NAME CHECKING
================================================================================*/

let mountedCount = 0, unmountedCount = 0, overallCount = 0;
const GetOverallCount = () => (`mnt [${ mountedCount }] | unmnt [${ unmountedCount }] | ovrl [${ overallCount }]`);

interface T_addComponent {
	(props: {
		name: string;
		verbose?: boolean | "true" | "false";
	}): string;
}

const AddComponent: T_addComponent = ({ name, verbose }) => {
	if (!IsValidComponentName(name)) throw new Error("Error setting component name within ComponentManager");

	// * Check if name already exists in the store
	let count = 0;
	if (components.findIndex(c => c.rawName === name) !== -1) {
		const filteredItems: T_componentObject[] = components.filter(c => c.rawName === name);
		const objWithMaxCount = filteredItems.reduce((prev, current) => (prev.count > current.count) ? prev : current);
		count = objWithMaxCount.count + 1;
	}

	const obj: T_componentObject = {
		rawName    : name,
		uniqueName : `${ name } (${ count })`,
		count      : count,
	};

	components.push(obj);

	// * Register Mounted
	mountedCount++;
	overallCount = mountedCount - unmountedCount;
	verbose && Log.Mounted(obj.uniqueName + "  " + GetOverallCount());

	return obj.uniqueName;
};
/*================================================================================
END OF ADD COMPONENT
================================================================================*/

interface I_removeComponent {
	(props: {
		name: string;
		verbose?: boolean;
	}): void;
}

const RemoveComponent: I_removeComponent = ({ name, verbose }) => {
	const idx = components.findIndex(c => c.uniqueName === name);
	if (idx === -1) {
		throw new Error("Error finding idx of componentName to remove in ComponentManager");
	} else {
		verbose && Log.Attempt(`Removing idx [${ idx }] in ComponentManager`);
	}

	components.splice(idx, 1);

	// * Register Unmounted
	unmountedCount++;
	overallCount = mountedCount - unmountedCount;
	verbose && Log.Unmounted(name + "  " + GetOverallCount());
};
/*================================================================================
END OF RemoveComponent
================================================================================*/

interface I_useComponent {
	(props: {
		name: string;
		verbose?: boolean;
		onMountFunction?: () => unknown;
		onUnmountFunction?: () => unknown;
	}): void;
}

export const useComponent: I_useComponent = ({ name, verbose=true, onMountFunction, onUnmountFunction }) => {
	const myName = useRef<string>("");

	useEffect(() => {
		myName.current = AddComponent({ name, verbose });
		Log.Success(`useComponent initialised from component: ${ myName.current }`);
		if (typeof onMountFunction === "function") onMountFunction();

		return () => {
			RemoveComponent({ name: myName.current, verbose });
			if (typeof onUnmountFunction === "function") onUnmountFunction();
		};
	}, [ name, verbose, onMountFunction, onUnmountFunction ]);

	useEffect(() => {
		verbose && Log.Render(myName.current);
	});
};
