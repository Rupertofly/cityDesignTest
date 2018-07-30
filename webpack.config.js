const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: {
    bundle: path.resolve(__dirname, 'src', 'index.js')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8080,
    openPage: '',
    stats: 'errors-only',
    inline: false,
    disableHostCheck: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {loader: 'babel-loader'},
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{loader: 'babel-loader'}]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: 'body'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'assets'),
        to: path.resolve(__dirname, 'dist', 'assets')
      }
    ])
  ],
  devtool: 'inline-source-map'
}
