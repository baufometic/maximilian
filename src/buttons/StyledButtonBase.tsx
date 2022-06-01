import styled from "styled-components"

const priorities = {
	low: {
		spacingMin : "36px",
		spacingMax : "48px",
		width      : "42px"
	},
	medium: {
		spacingMin : "24px",
		spacingMax : "36px",
		width      : "60px"
	},
	high: { // older users prefer
		spacingMin : "12px",
		spacingMax : "24px",
		width      : "72px"
	}
}

const StyledButtonBase = styled.button`
	/** Static */
	background: white;
	border-radius: 5px;
	box-shadow: inset 1px 2px 1px whitesmoke;
	color: black;
	padding: 5px 10px;
	transition: 300ms ease-in-out;

	&:hover {
		border: 1px solid darkorange;
	}
`

/*____________________ DYNAMIC BUTTONS ____________________*/
//* High Priority
export const BtnLowPriority = styled(StyledButtonBase)`
	margin: inherit ${ priorities["low"].spacingMin };
	width: ${ priorities["low"].width };
`

//* Medium Priority
export const BtnMediumPriority = styled(StyledButtonBase)`
	margin: inherit ${ priorities["medium"].spacingMin };
	width: ${ priorities["medium"].width };
`

//* High Priority
export const BtnHighPriority = styled(StyledButtonBase)`
	margin: inherit ${ priorities["high"].spacingMin };
	width: ${ priorities["high"].width };
`
