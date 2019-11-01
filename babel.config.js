module.exports = {
  presets: [
    "@babel/preset-env",
    '@babel/preset-react',
    '@babel/typescript'
  ],
  plugins: [
    '@babel/proposal-object-rest-spread',
  ],
  env: {
    development: {
      sourceMaps: true,
      inputSourceMap: true,
    },
    test: {
      sourceMaps: true,
      inputSourceMap: true,
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }
  }
}
