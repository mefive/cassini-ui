const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './test'),

  entry: {
    index: './index',
  },

  output: {
    filename: '[name].[chunkhash:7].js',
    path: path.join(__dirname, 'build'),
  },

  // externals: ['react', 'react-dom'],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
        loader: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  plugins: [
    new CleanWebpackPlugin(['build']),

    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
    }),
  ],

  devtool: '#source-map',

  devServer: {
    port: 9910,
    inline: false,
    hot: false,
    contentBase: path.resolve(__dirname, 'dev'),
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: true,
  },
};
