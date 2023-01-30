/* eslint-disable no-console */
import shebang from "rollup-plugin-preserve-shebang";
import replace from "@rollup/plugin-replace";
import json from "@rollup/plugin-json";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require("./package.json");
const NODE_ENV = process.env.NODE_ENV || "development";
console.log(`ENV: ${ NODE_ENV }`);

const plugins = [
	shebang(),
	replace({
		exclude                : "node_modules/**",
		preventAssignment      : true,
		"process.env.NODE_ENV" : JSON.stringify(NODE_ENV)
	}),
	json(),
	peerDepsExternal(),
	nodeResolve(),
	typescript({
		tsconfig           : "./tsconfig.json",
		outputToFilesystem : false
	}),
	commonjs()
];

export default [
	//* .cjs.js
	{
		input  : "src/index.ts",
		output : [ {
			file      : packageJson.main, // >> dist/index.cjs.min.js
			format    : "cjs",
			sourcemap : false
		} ],
		plugins: [
			...plugins,
			terser()
		]
	},

	//* .esm.js
	{
		input  : "src/index.ts",
		output : [ {
			file      : packageJson.module, // >> dist/index.esm.min.js
			format    : "esm",
			sourcemap : false
		} ],
		plugins: [
			...plugins,	
			terser()
		]
	},

	//* Reduce d.ts files to a single file
	{
		input  : "dist/index.d.ts",
		output : [
			{
				file   : packageJson.types,
				format : "esm"
			},
			{
				file   : packageJson.types,
				format : "cjs"
			}
		],
		plugins: [
			...plugins,
			dts()
		]
	}
];
