/* eslint-disable no-undef */
module.exports = {
	"env": {
		"browser" : true,
		"es2021"  : true,
		"node"    : true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion" : 12,
		"sourceType"  : "module"
	},
	"plugins": [
		"react"
	],
	"settings": {
		"react": {
			"version": "detect"
		}
	},
	"rules": {
		"array-bracket-spacing": [
			"error",
			"always"
		],
		"indent": [
			"error",
			"tab"
		],
		"key-spacing": [
			"error",
			{
				"align": {
					"beforeColon" : true,
					"afterColon"  : true,
					"on"          : "colon"
				}
			}
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"no-console"           : "error",
		"no-multi-spaces"      : "error",
		"object-curly-spacing" : [
			"error",
			"always"
		],
		"react/jsx-indent": [
			"error",
			"tab"
		],
		"react/jsx-indent-props": [
			"error",
			"tab"
		],
		"react/react-in-jsx-scope" : "off",
		"react/prop-types"         : "off",
		"quotes"                   : [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"template-curly-spacing": [
			"error",
			"always"
		]
	}
};
