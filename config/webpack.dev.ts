// webpack.config.js
import path from 'path'
import webpack, { Configuration } from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'


const config: Configuration = {
    target: 'web', // 默认打包成web平台的
    mode: 'development', // 环境 development 和 production 环境 链接： https://www.webpackjs.com/concepts/mode/#mode-development
    entry: path.resolve(__dirname, '../src/index.tsx'), // 替换成tsx
    output: {
      filename: '[name].[hash:8].js', // 文件名
      path: path.resolve(__dirname, '../dist') // 文件输出地址
    },
    plugins: [
      // new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({ filename: 'css/[name].css' }), // 修改名称命名
      new HtmlWebpackPlugin({
      title: '项目',
      filename: 'index.html',
      template: path.resolve(__dirname, './index.ejs'),
      hash: true,
      cache: false,
      inject: true,
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyCSS: true // 缩小CSS样式元素和样式属性
      },
      nodeModules: path.resolve(__dirname, '../node_modules')
    }),
      new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash:8].css' }), // 设置文件存放的位置和名称
  ],
    //...
  module: {
      rules: [
          //...,
           {
              test: /\.(ts|tsx)$/,// 替换成ts｜tsx
              exclude: /(node_modules|bower_components)/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    cacheDirectory: true
                  }
                }
              ]
            },
            {
               test: /\.(png|svg|jpg|gif)$/, // 图片
               use: [
               {
                 loader: 'file-loader',
                 options: {
                   name: 'assets/images/[name].[ext]' // 存放的位置： dist/assets/images/文件
                 }
               }
              ]
            },
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/, // 字体
              use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'assets/fonts/[name].[ext]'// 存放的位置： dist/assets/fonts/文件
               }
              }
             ]
         },
             {
               test: /\.css$/, // css 样式
               use: [
                'style-loader',
                'css-loader',
               'postcss-loader'
              ]
             },
             {
               test: /\.less$/i, // less 样式
               use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                'less-loader'
              ]
             }, 
             {
               test: /\.css$/,
               use: [
               MiniCssExtractPlugin.loader, // 'style-loader', 因为我们直接用的 mode是'production' 所以就直接替换了
              'css-loader',
              'postcss-loader'
              ]
             },
             {
              test: /\.less$/i,
              use: [
              MiniCssExtractPlugin.loader, // 'style-loader',
              'css-loader',
              'postcss-loader',
              'less-loader'
            ]
          },
        ]
    },
    resolve: {
      // 将.js｜.jsx 删除 替换成.ts|.tsx新增加 .less
      extensions: ['.tsx', '.js', '.ts', '.less', '.css']
    }
}
// 之前是直接命令行之行的代码，因为使用ts-node 所以使用ts运行webpack-dev-server
const devserver = new WebpackDevServer({
  headers: { 'Access-Control-Allow-Origin': '*' },
  hot: true, // 热更新
  host: '127.0.0.1', // 地址
  port: '8081', // 端口
  open: true, // 是否自动打开
  setupExitSignals: true,
  compress: true
}, webpack(config))
// 启动
devserver.start()


module.exports = {
  target: 'web', // 默认打包成web平台的
  mode: 'development', // 环境 development 和 production 环境 链接： https://www.webpackjs.com/concepts/mode/#mode-development
  entry: path.resolve(__dirname, '../src/index.jsx'), // 文件的入口
  output: {
    filename: '[name].[hash:8].js', // 文件名
    path: path.resolve(__dirname, '../dist') // 文件输出地址
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }), // 修改名称命名
    new HtmlWebpackPlugin({
      title: '项目',
      filename: 'index.html',
      template: path.resolve(__dirname, './index.ejs'),
      hash: true,
      cache: false,
      inject: true,
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyCSS: true // 缩小CSS样式元素和样式属性
      },
      nodeModules: path.resolve(__dirname, '../node_modules')
    }),
      new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash:8].css' }), // 设置文件存放的位置和名称
  ],
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
      },
      {
    test: /\.(png|svg|jpg|gif)$/, // 图片
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]' // 存放的位置： dist/assets/images/文件
        }
      }
    ]
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/, // 字体
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[ext]'// 存放的位置： dist/assets/fonts/文件
        }
      }
    ]
  },
  {
    test: /\.css$/, // css 样式
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader'
    ]
  },
  {
    test: /\.less$/i, // less 样式
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader',
      'less-loader'
    ]
  }, 
   {
       test: /\.css$/,
       use: [
       MiniCssExtractPlugin.loader, // 'style-loader', 因为我们直接用的 mode是'production' 所以就直接替换了
        'css-loader',
        'postcss-loader'
            ]
          },
          {
            test: /\.less$/i,
            use: [
              MiniCssExtractPlugin.loader, // 'style-loader',
              'css-loader',
              'postcss-loader',
              'less-loader'
            ]
          },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.css']
  },
   devServer: { // 新增webpack-dev-server 的配置
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true, // 热更新
    host: '127.0.0.1', // 地址
    port: '8081', // 端口
    open: true, // 是否自动打开
    setupExitSignals: true,
    compress: true
  }
}