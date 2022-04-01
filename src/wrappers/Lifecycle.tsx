import React, { ReactNode } from "react";
import { useComponent } from "../hooks/useComponent";

interface I_LifecycleWrapper {
	(props: {
		name: string;
		verbose?: boolean;
		children?: ReactNode;
	}): JSX.Element;
}

/** Wraps around any component and enables lifecycle tracking */
const LifecycleWrapper: I_LifecycleWrapper = ({ name, verbose=false, ...props }) => {
	useComponent({ name, verbose });

	return <>{ props.children }</>;
};

export { LifecycleWrapper };
