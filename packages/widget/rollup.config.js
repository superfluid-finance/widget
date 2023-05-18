import terser from '@rollup/plugin-terser'
import multiEntry from "@rollup/plugin-multi-entry"
export default {
	input: ['dist/src/index.js', 'dist/src/WebComponent.js'],
	output: {
		file: 'dist/index.js',
	},
    plugins: [terser(), multiEntry()]
};