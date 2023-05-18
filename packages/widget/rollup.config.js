import terser from '@rollup/plugin-terser'
export default {
	input: 'dist/src/index.js',
	output: {
		file: 'dist/index.js',
	},
    plugins: [terser()]
};