import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from "rollup-plugin-replace";

import { terser } from 'rollup-plugin-terser';
import path from 'path';

const pkg = require(path.resolve(process.cwd(), './package.json'));

const extensions = ['.ts', '.tsx', '.js', '.jsx'];

const external = [...Object.keys(pkg.peerDependencies || {})];

const plugins = (dev) => ([
  replace({
    "process.env.NODE_ENV": JSON.stringify(dev ? "development" : "production"),
  }),
  commonjs(),
  // Allows node_modules resolution
  resolve({ extensions, mainFields: ['module', 'main'] }),

  // Compile TypeScript/JavaScript files
  babel({ configFile: './babel.config.js', extensions, include: ['src/**/*'] }),
  dev ? null : terser(),
]);

export default CLIArgs => {
  const dev = !!CLIArgs.dev;
  return [{
    input: './src/index.ts',
    external,
    plugins: plugins(dev),
    output: [
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.browser,
        format: 'umd',
        name: 'perfForm',
        sourcemap: true,
      }
    ]
  }]

};