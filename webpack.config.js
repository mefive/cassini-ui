const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index',

  output: {
    filename: '[name].[chunkhash:7].js',
    path: path.join(__dirname, 'build'),
    libraryTarget: 'umd',
  },

  externals: ['react', 'react-dom'],

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
  ],
};
