import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import path from 'path';

const pkg = require(path.resolve(process.cwd(), './package.json'));

const extensions = ['.ts', '.tsx', '.js', '.jsx'];

const external = [...Object.keys(pkg.peerDependencies || {})];

const plugins = [
  commonjs({ include: /node_modules/ }),
  // Allows node_modules resolution
  resolve({ extensions, mainFields: ['module', 'main'] }),

  // Compile TypeScript/JavaScript files
  babel({ configFile: './babel.config.js', extensions, include: ['src/**/*'] }),
  terser()
];

export default [{
  input: './src/index.ts',
  external,
  plugins,
  output: [
    {
      file: pkg.module,
      format: 'esm'
    },
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'perfForm'
    }
  ]
}];