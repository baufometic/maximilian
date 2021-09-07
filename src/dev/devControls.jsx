import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Log } from "../base/errorHandling";
import { useMousePosition } from "../hooks/useMousePosition";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { Device } from "../style/mediaQueries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt } from "@fortawesome/free-solid-svg-icons";

const drawerHandleWidth = "50px";

const Layout = styled.div`
	&.show {
		animation: ${ keyframes`
			from {
				transform: translate(calc(-100% + ${ drawerHandleWidth }), -50%);
			}
			to {
				transform: translate(0, -50%);	
			}
		` } 300ms ease-in forwards;

		.headingContainer {
			animation: ${ keyframes`
				to { box-shadow: 0 1px 30px -2px orange; }
			` } 600ms 300ms linear forwards;
		}
	}

	&.hide {
		animation: ${ keyframes`
			from {
				transform: translate(0, -50%);
			}
			to {
				transform: translate(calc(-100% + ${ drawerHandleWidth }), -50%);	
			}
		` } 300ms ease-in forwards;

		.headingContainer {
			animation: ${ keyframes`
				to { box-shadow: 0; }
			` } 600ms 300ms linear forwards;
		}
	}

	background-color: 0;
	color: #2FEBD2;
	cursor: pointer;
	display: grid;
	grid-template-areas: "_content _heading";
	grid-template-columns: 1fr 50px;
	grid-template-rows: 1fr;
	left: 0;
	position: absolute;
	top: 50%;
	z-index: 1000;

	.headingContainer {
		align-items: center;
		border-radius: 0 50px 50px 0;
		display: flex;
		grid-area: _heading;
		position: relative;
		justify-content: center;

		.rotatedWrapper {
			display: flex;
			flex-direction: row;
			transform: rotate(90deg);

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

		.mediaQueries {
			> * {
				padding: 5px;
			}

			${ Object.entries(Device).map(([ key, value ]) => css`
				.${ key } {
					color: grey; // inactive/initial
						
					@media ${ value } {
						border: 1px solid #2FEBD2;
						color: #2FEBD2 // active
					}
				}
			`) }
		}
	}
`;

export const DevControls = () => {
	const [ mousePosition ] = useMousePosition();
	const [ windowDimensions ] = useWindowDimensions();
	const [ showControls, setShowControls ] = useState(false);

	useEffect(() => {
		Log.Linebreak("Device breakpoints available");
		Log.ObjectEntries(Device);
	}, []);

	return(
		<Layout
			id="devControls"
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
						{ "dev" }
					</div>

					<FontAwesomeIcon
						className="iconRight"
						icon={ faCompressAlt }>
					</FontAwesomeIcon>
				</div>
			</div>
			
			<div className="gauges">
				{/*__________ MOUSE POS __________*/}
				<div className="mousePosition">
					{ `Mouse\n${ mousePosition.x } x ${ mousePosition.y }` }
				</div>
				
				{/*__________ WINDOW DIMENSIONS __________*/}
				<div className="windowDimensions">
					{ `Window${
						Object.entries(windowDimensions).map(entry => {
							const [ key, val ] = entry;
							return(`\n${ key }: ${ val }`);
						})
					}`}
				</div>

				{/*__________ MEDIA QUERIES __________*/}
				<div className="mediaQueries">
					{ Object.entries(Device).map(([ key, value ], idx) => (
						<div
							className={ key }
							key={ idx.toString() }>

							{ key }
						</div>
					)) }
				</div>
			</div>
		</Layout>
	);	
};
