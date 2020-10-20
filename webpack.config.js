// const webpack = require('webpack')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MonacoEditorPlugin = require('monaco-editor-webpack-plugin')
const WorkerPlugin = require('worker-plugin')

module.exports = {
  // cache: {
  //   type: 'filesystem',
  //   buildDependencies: {
  //     config: [__filename]
  //   }
  // },
  // mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  // devtool:
  //   process.env.NODE_ENV === 'production'
  //     ? 'source-source-map'
  //     : 'eval-cheap-module-source-map',
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.vue', '.json', '.mjs', '.wasm'],
    alias: {
      vue: require.resolve('vue/dist/vue.esm-bundler.js'),
      'uniroll-vue': require.resolve('uniroll-vue/dist/uniroll-vue.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
            transpileOnly: true,
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      },
      {
        test: /\.worker\.ts$/i,
        use: [
          {
            loader: 'comlink-loader',
            options: {
              singleton: true
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: { limit: 8192 }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ttf$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        include: /pluginutils/, // for @rollup/pluginutils
        type: 'javascript/auto'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MonacoEditorPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html')
    }),
    new WorkerPlugin({
      globalObject: 'self'
    })
  ],
  devServer: {
    inline: true,
    hot: true,
    // stats: 'verbose',
    contentBase: __dirname,
    overlay: true
  }
}
