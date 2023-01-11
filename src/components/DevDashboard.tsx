import { useState } from "react";
import styled from "styled-components";
import {
	useCookies,
	useMediaQueries,
	useMousePosition,
	useScreen,
	useSensors
} from "../hooks";
import { OBJ } from "../base/objects";
import { ToggleFullScreen } from "../browser/screen";
import { SASS } from "../styling/SASS";

const Layout = styled.div<{
	isVisible: boolean;
}>`
	cursor: pointer;
	display: grid;
	left: 0;
	margin-left: 0.25rem;
	position: absolute;
	text-transform: uppercase;
	top: 50%;
	transform: rotateX(345deg) rotateY(15deg) translateY(-50%);
	transform-style: preserve-3d;
	z-index: 100000;

	.btnToggleTray {
		border: 1px solid black;
	}

	.group {
		${ ({ isVisible }) => !isVisible && "display: none !important;" };
		${ SASS.flexCenterColumn };
		border-radius: 5px;
		color: white;
		font-size: 1.2vh;
		width: 100%;

		> * {
			background: rgba(12,20,31);
			text-align: center;
			width: 100%;
		}

		span {
			&.active {
				border: 1px solid lightgreen;
			}
		}

		.btnToggleFullscreen {
			background-color: lightgrey;
			border: 1px solid grey;
			color: green;
			font-weight: bold;
		}
	}
`;

export const DevDashboard: React.FC = () => {
	const [ isTrayActive, setIsTrayActive ] = useState(true);
	
	const { cookieStatus } = useCookies();
	const { mediaQueries } = useMediaQueries();
	const { mousePosition } = useMousePosition();
	const { sensors } = useSensors(); // TODO graph the history using three js
	const { screen } = useScreen();
	
	return(
		<Layout isVisible={ isTrayActive }>
			<button
				className="btnToggleTray"
				onClick={ () => setIsTrayActive(prev => !prev) }>
				{ isTrayActive ? "Hide Tray" : "Show Tray" }
			</button>
			<div className="group">
				<button
					className="btnToggleFullscreen"
					onClick={ ToggleFullScreen }>
					{ "Full Screen" }
				</button>
			</div>
			<div className="group">
				<span
					className={ cookieStatus === "ACCEPTED"? "active" : "inactive" }>
					{ `COOKIES: ${ cookieStatus }` }
				</span>
			</div>
			<div className="group">
				<span>MEDIA QUERIES</span>
				{ OBJ.Entries(mediaQueries).map(obj => {
					const [ queryName, isActive ] = obj;
					return(
						<span
							key={ queryName }
							className={ isActive? "active" : "inactive" }>
							{ queryName }
						</span>
					);
				}) }
			</div>
			<div className="group" >
				<span>MOUSE POS</span>
				<span>client x { mousePosition.clientX }</span>
				<span>client y { mousePosition.clientY }</span>
				<span>dist from x { mousePosition.distanceFromCentreX }</span>
				<span>dist from y { mousePosition.distanceFromCentreY }</span>
				<span>x { mousePosition.x }</span>
				<span>y { mousePosition.y }</span>
				<span>updates { mousePosition.noOfUpdates }</span>
			</div>
			<div className="group" >
				<span>SENSORS</span>
				<span>{ `count: ${ sensors.noOfUpdates }` }</span>
				<span>{ `x: ${ Number(sensors.x).toFixed(2) }` }</span>
				<span>{ `y: ${ Number(sensors.y).toFixed(2) }` }</span>
				<span>{ `z: ${ Number(sensors.z).toFixed(2) }` }</span>
			</div>
			<div className="group" >
				<span>WINDOW</span>
				<span>height { screen.height }</span>
				<span>width { screen.width }</span>
				<span>centre x { screen.centreX }</span>
				<span>centre y { screen.centreY }</span>
			</div>
		</Layout>
	);
};
