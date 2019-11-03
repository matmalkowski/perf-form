import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from "rollup-plugin-replace";
import sourceMaps from 'rollup-plugin-sourcemaps'

import { terser } from 'rollup-plugin-terser';
import path from 'path';

const pkg = require(path.resolve(process.cwd(), './package.json'));

const extensions = ['.ts', '.tsx', '.js', '.jsx'];

const external = [...Object.keys(pkg.peerDependencies || {})];

const plugins = (dev) => ([
  replace({
    "__DEV__": JSON.stringify(dev),
  }),
  commonjs(),
  // Allows node_modules resolution
  resolve({ extensions, mainFields: ['module', 'main'] }),

  // Compile TypeScript/JavaScript files
  babel({ configFile: './babel.config.js', extensions, include: ['src/**/*'] }),
  sourceMaps(),
  dev ? null : terser({
    sourcemap: true,
    output: { comments: false },
    compress: {
      keep_infinity: true,
      pure_getters: true,
      passes: 10,
    },
    ecma: 5,
    warnings: true,
  }),
]);

const outputCommon = {
  sourcemap: true,
  globals: { react: 'React' },
  exports: 'named',
  freeze: false,
  esModule: false,
  treeshake: {
    propertyReadSideEffects: false,
  },
}

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
        ...outputCommon
      },
      {
        file: pkg.main,
        format: 'cjs',
        ...outputCommon
      },
      {
        file: pkg.browser,
        format: 'umd',
        name: 'perfForm',
        ...outputCommon
      }
    ]
  }]

};