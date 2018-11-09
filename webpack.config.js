const path = require('path');
const BUILD_DIR = path.resolve(__dirname, 'client/dist');
const APP_DIR = path.resolve(__dirname, 'client/src');

module.exports = {
  mode: 'development',
  entry: [`@babel/polyfill`, `${APP_DIR}/index.jsx`],
  output: {
    path: BUILD_DIR,
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: BUILD_DIR,
    compress: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        pathRewrite: {'^/api': ''}
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        include: APP_DIR,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
