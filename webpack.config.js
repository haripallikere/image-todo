const path = require('path');

const config = {
  mode: "development",
  target: "web",
  entry : "./client/index.js",
  module : {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "bundle.css"
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "client.bundle.js"
  }
}

module.exports = config;