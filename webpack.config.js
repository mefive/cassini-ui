const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const keysTransformer = require('ts-transformer-keys/transformer').default;
const LodashWebpackPlugin = require('lodash-webpack-plugin');

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
        options: {
          getCustomTransformers: program => ({
            before: [
              keysTransformer(program),
            ],
          }),
        },
      },
      {
        test: /\.scss$/,
        loader: [
          MiniCssExtractPlugin.loader,
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

    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),

    new LodashWebpackPlugin({
      shorthands: true,
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[hash:7].css',
      chunkFilename: '[id].css',
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
