const webpack = require('webpack');

const config = {
  // production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "production",

  // メインのJS
  entry: "./src/js/index.js",
  // 出力ファイル
  output: {
    filename: "main.min.js"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
}

module.exports = config;