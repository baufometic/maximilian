import { useComponent } from "../hooks/useComponent";

interface I_LifecycleWrapper {
	(props: {
		disableRenderLogging?: boolean;
		name: string;
		verbose?: boolean;
		children?: React.ReactNode;
	}): JSX.Element;
}

/** Wraps around any component and enables lifecycle tracking */
export const LifecycleWrapper: I_LifecycleWrapper = ({ name, verbose=true, ...props }) => {
	useComponent({ name, verbose });
	return <>{ props.children }</>;
};
