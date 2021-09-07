import React, { Component, lazy, Suspense } from "react";
import { Log } from "../base/errorHandling";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.children = props;
		this.state = { error: null, errorInfo: null };
	}

	componentDidCatch(vError, vErrorInfo) {
		this.setState({ error: vError, errorInfo: vErrorInfo });
		Log.Error(`Error Boundary caught: ${ vError } // ${ vErrorInfo }`);
	}

	render() {
		const { errorInfo } = this.state;
		if (errorInfo) return (<h1>ErrorBoundary net caught err</h1>);
		return (this.children);
	}
}

const Lazy = {
	Suspended: (props) => {
		const [ component, fallback ] = props;
		return (
			<ErrorBoundary>
				<Suspense fallback={fallback}>{ component }</Suspense>
			</ErrorBoundary>
		);
	},

	WithTimeout: (props) => {
		const [ delay, PassedInComponent ] = props;
		const PromisedComponent = lazy(() => new Promise((resolve) => {
			setTimeout(() => {
				resolve({ default: () => <PassedInComponent /> });
			}, delay);
		}));
		return (<PromisedComponent />);
	},
};

export default Lazy;

/*
const LazyLoadDefault = (fileAndPathToDefault) => lazy(() => import(fileAndPathToDefault));
const LazyLoadNamed = (importPath = "", importName = "") =>
lazy(() => import(importPath).then(module => ({ default: module[importName] })));
*/
