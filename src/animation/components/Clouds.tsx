import { useState } from "react";
import styled from "styled-components";
import { Random } from "../../index";

const Sky = styled.div`
   	bottom: 0;
	left: 0;
	padding-top: 50px;
	position: fixed;
	right: 0;
	top: 0;
	z-index: -1;

`;

const Cloud = styled.div<{ animationDurationMS: number}>`
	background: #fff;
	background: linear-gradient(top,  #fff 5%,#f1f1f1 100%);
	border-radius: 100px;
	box-shadow: 0 8px 5px rgba(0, 0, 0, 0.2);
	height: 120px;
	position: relative;
	width: 350px;

	@keyframes animMoveCloud {
		from { margin-left: -100vw; }
		to { margin-left: 100vw; }
	}
	
	animation: animMoveCloud ${ ({ animationDurationMS }) => animationDurationMS }ms linear infinite;

	&::before, &::after {
		background: #fff;
		content: '';
		position: absolute;
		z-index: -1;
	}

	&:before {
		border-radius: 200px;
		width: 180px;
		height: 180px;
		right: 50px;
		top: -90px;
	}

	&:after {
		border-radius: 100px;
		height: 100px;
		left: 50px;
		top: -50px;
		width: 100px;
	}
`;

export const CloudComponent = () => {
	const [ components, ] = useState(() => {
		//const durationMS = [ "35s", "19s", "32s", "15s", "25s" ];
		const scales = [ "0.65", "0.30", "0.50", "0.40", "0.55" ];

		return(
			[ ...Array(scales.length).fill(0) ].map((item, idx) => (
				<Cloud
					animationDurationMS={ Random.NumberBetween(10000,50000) }
					key={ idx }
					style={ {
						transform: `scale(${ scales[idx] })`,
					} }
				/>
			))
		);
	});

	return(
		<Sky>
			{ components }
		</Sky>
	);
};
