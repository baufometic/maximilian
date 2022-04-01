import styled from "styled-components";

const Buttons = {
	Regular: styled.button`
		background: white;
		border-radius: 5px;
		box-shadow: inset 1px 2px 1px whitesmoke;
		color: black;
		position: absolute;
		padding: 5px;
	`,

	Fancy: styled.button`
		background: #121212;
		border: 0;
		height: 30px;
		padding: 5px 10px;
		position: absolute;
		width: 50px;
		transition: 300ms ease-in-out;
		z-index: 1;

		// icon
		svg {
			transition: transform 300ms cubic-bezier(0.25, 0.96, 0.45, 0.94);
		}

		&:hover {
			border: 1px solid darkorange;
			color: rebeccapurple;
		}
	`,
};

export { Buttons };
