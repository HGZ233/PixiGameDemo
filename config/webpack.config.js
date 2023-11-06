// webpack.config.js
const path = require('path')

module.exports = {
  target: 'web', // 默认打包成web平台的
  mode: 'production', // 环境 development 和 production 环境 链接： https://www.webpackjs.com/concepts/mode/#mode-development
  entry: path.resolve(__dirname, '../src/index.jsx'), // 文件的入口
  output: {
    filename: 'js/[name].[chunkhash:8].js', // 文件名
    path: path.resolve(__dirname, '../dist') // 文件输出地址
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
},
resolve: {
  extensions: ['.jsx', '.js', '.css']
}
}