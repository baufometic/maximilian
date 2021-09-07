import React, { useEffect, useReducer, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Log } from "../base/errorHandling";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt } from "@fortawesome/free-solid-svg-icons";

const drawerHandleWidth = "50px";

const Layout = styled.div`
	&.show {
		animation: ${ keyframes`
			from {
				transform: translate(calc(100% - ${ drawerHandleWidth }), -50%);
			}
			to {
				transform: translate(0, -50%);	
			}
		` } 300ms ease-in forwards;

		.headingContainer {
			animation: ${ keyframes`
				to { box-shadow: 0 1px 30px -2px orange; }
			` } 600ms linear forwards;
		}
	}

	&.hide {
		animation: ${ keyframes`
			from {
				transform: translate(0, -50%);
			}
			to {
				transform: translate(calc(100% - ${ drawerHandleWidth }), -50%);	
			}
		` } 300ms ease-in forwards;

		.headingContainer {
			animation: ${ keyframes`
				to { box-shadow: 0; }
			` } 600ms linear forwards;
		}
	}

	background-color: 0;
	color: #2FEBD2;
	cursor: pointer;
	display: grid;
	grid-template-areas: "_heading _content";
	grid-template-columns: 50px 1fr;
	grid-template-rows: 1fr;
	right: 0;
	position: absolute;
	top: 50%;
	z-index: 1000;

	.headingContainer {
		align-items: center;
		border-radius: 50px 0 0 50px;
		display: flex;
		grid-area: _heading;
		position: relative;
		justify-content: center;

		.rotatedWrapper {
			display: flex;
			flex-direction: row;
			transform: rotate(-90deg);

			.iconLeft {
				transform: translate(-10px, -10px) rotate(90deg);
			}

			.heading {
				text-transform: uppercase;
				white-space: nowrap;
			}

			.iconRight {
				transform: translate(10px, -10px);
			}

			.heading {
				white-space: nowrap;
			}
		}
	}

	.gauges {
		display: flex;
		flex-direction: column;
		grid-area: _content;

		> * {
			background: 0;
			border: 1px solid orange;
			border-radius: 5px;
			color: #2FEBD2;
			padding: 10px;
			white-space: pre;
		}
	}
`;

const ACTIONS = {
	INITIALISE       :	"initialise",
	TOGGLE_WIREFRAME :	"toggle-wireframe",
	PREVIOUS_THEME   :	"previous-theme",
	NEXT_THEME       :	"next-theme", 
	RANDOM_THEME     :	"random-theme",
};

const ThemeReducer = (state, action) => {
	switch (action.type) {
	case ACTIONS.INITIALISE: {
		const list = action.payload.list;
		const noOfThemes = list.length;
		const previousIndex = noOfThemes - 1;

		Log.Attempt(`There are ${ noOfThemes } available themes: ${
			list.map(themeObj => themeObj.name).join(", ")
		}`);

		return {
			list,
			noOfThemes,
			previousIndex,
			previousName     : list[previousIndex].name,
			currentIndex     : 0,
			currentName      : list[0].name,
			currentTheme     : list[0],
			wireframeEnabled : false
		};
	}

	case ACTIONS.TOGGLE_WIREFRAME: {
		state.wireframeEnabled = !state.wireframeEnabled;
		state.currentTheme.wireframeEnabled = state.wireframeEnabled;

		return {
			...state
		};
	}

	case ACTIONS.PREVIOUS_THEME: {
		const newIndex = (state.currentIndex > 0) ? state.currentIndex - 1 : state.noOfThemes - 1;
		Log.StateChange(`Previous Theme: ${ state.currentName } :: Current Theme: ${ state.list[newIndex].name }`);
			
		return {
			...state,
			previousIndex : state.currentIndex,
			previousName  : state.currentName,
			currentIndex  : newIndex,
			currentName   : state.list[newIndex].name,
			currentTheme  : state.list[newIndex]
		};
	}
	
	case ACTIONS.NEXT_THEME: {
		const newIndex = (state.currentIndex < state.noOfThemes - 1) ? state.currentIndex + 1 : 0;
		Log.StateChange(`Previous Theme: ${ state.currentName } :: Current Theme: ${ state.list[newIndex].name }`);
			
		return {
			...state,
			previousIndex : state.currentIndex,
			previousName  : state.currentName,
			currentIndex  : newIndex,
			currentName   : state.list[newIndex].name,
			currentTheme  : state.list[newIndex]
		};
	}

	case ACTIONS.RANDOM_THEME: {
		const newIndex = state.list.flatMap((themeObj, idx) => themeObj.name === "random" ? idx : []); // Get the index of 'random-theme' theme in themes list
			
		//setActiveTheme({ ...availableThemes[themeIndex.current] }); // Spread it so it treats it as new obj, otherwise doesn't change
		
		return {
			...state,
			previousIndex : state.currentIndex,
			previousName  : state.currentName,
			currentIndex  : newIndex,
			currentName   : state.list[newIndex].name,
			currentTheme  : state.list[newIndex]
		};
	}
	
	default:
		return state;
	}
};

export const useTheme = (availableThemes, runDemo = false, demoIntervalMS = 3000) => {
	const [ themes, themeDispatch ] = useReducer(ThemeReducer, {
		currentTheme: availableThemes[0]
	});
	
	useEffect(() => {
		themeDispatch({ type: ACTIONS.INITIALISE, payload: { list: availableThemes } });
		
		let intervalTimer;
		if (runDemo) {
			Log.Attempt("Starting theme demo timer");
			intervalTimer = setInterval(() => {
				themeDispatch({ type: ACTIONS.NEXT_THEME });
			}, demoIntervalMS);
		}

		return() => {
			if (runDemo) clearInterval(intervalTimer);
		};
	}, []);

	//________________________________________ BUTTONS ________________________________________
	const ThemeControls = () => {
		const [ showControls, setShowControls ] = useState(false);

		return(
			<Layout
				id="themeControls"
				className={ showControls ? "show" : "hide" }>

				<div
					className="headingContainer"
					onClick={ () => {
						Log.Click("ToggleControls");
						setShowControls(prev => !prev);
					}}>

					<div className="rotatedWrapper">
						<FontAwesomeIcon
							className="iconLeft"
							icon={ faCompressAlt }>
						</FontAwesomeIcon>

						<div className="heading">
							{ "theme" }
						</div>
					
						<FontAwesomeIcon
							className="iconRight"
							icon={ faCompressAlt }>
						</FontAwesomeIcon>
					</div>
				</div>
			
				<div className="gauges">
					<button
						onClick={ () => {
							Log.Click("Toggle wireframe");
							themeDispatch({ type: ACTIONS.TOGGLE_WIREFRAME });
						}}
						style={{
							backgroundColor: themes.wireframeEnabled ? "green" : "orangered",
						}}>

						{ `Wireframe ${ themes.wireframeEnabled ? "Enabled" : "Disabled" }` }
					</button>

					<button
						onClick={ () => {
							Log.Click("Previous theme");
							themeDispatch({ type: ACTIONS.PREVIOUS_THEME });
						}}>
						
						{ "Previous Theme" }
					</button>

					<button
						onClick={ () => {
							Log.Click("Next theme");
							themeDispatch({ type: ACTIONS.NEXT_THEME });
						}}>
						
						{ "Next Theme" }
					</button>

					<button
						onClick={ () => {
							Log.Click("Random theme");
							themeDispatch({ type: ACTIONS.RANDOM_THEME });
						}}>
							
						{ "Random Theme" }
					</button>
				</div>
			</Layout>
		);
	};

	return [
		themes,
		ThemeControls
	];
};
