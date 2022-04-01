import { createGlobalStyle } from "styled-components";

const GlobalResetComponent = createGlobalStyle`
	#__next {
		height: 100%;
		width: 100%;
	}

	.sbui-auth {
		width: inherit !important;
	}

	*,
	:before,
	:after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	html,
	body {
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
				Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
		height: 100vh;
		min-height: 100vh;
		overflow: hidden;
		width: 100%;
	}

	html, body, div, span, object, iframe, figure, video, main, canvas, embed, header, footer, section,
	nav, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a,
	code, em, img, small, strike, strong, sub, sup, tt, b, u, i, ol, ul, li, fieldset, form, label, table, caption,
	tbody, tfoot, thead, tr, th, td {
		border: 0;
		font-size: 100%;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		text-size-adjust: none;
		vertical-align: baseline;
	}

	header,
	footer,
	nav,
	main,
	section {
		display: block;
	}

	body {
		line-height: 1;
	}

	a {
		color: inherit;
	}

	a,
	a:link,
	a:visited,
	a:focus,
	a:hover,
	a:active {
		text-decoration: none;
	}

	ol,
	ul {
		list-style: none;
	}

	blockquote,
	q {
		quotes: none;
	}

	blockquote::before,
	blockquote::after,
	q::before,
	q::after {
		content: "";
		content: none;
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	input {
		-webkit-appearance: none;
		border-radius: 0;
	}
`;

export {
	GlobalResetComponent,
};