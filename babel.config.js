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
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }
  }
}
