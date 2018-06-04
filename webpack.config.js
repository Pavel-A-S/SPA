var path = require("path");
const { VueLoaderPlugin } = require('vue-loader');

var ASSETS_DIR = path.join(__dirname, "vue");
var PUBLIC_DIR = path.join(__dirname, "public");

module.exports = {
  context: ASSETS_DIR,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  entry: {
    spa: ['./js/spa.js']
  },
  output: {
    path: PUBLIC_DIR,
    filename: "./js/[name].js"
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  plugins: [new VueLoaderPlugin()]
};
