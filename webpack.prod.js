
const { DefinePlugin }  = require('webpack'),
      merge             = require('webpack-merge'),
      common            = require('./webpack.common.js'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {

  target: 'electron',

  module: {
    rules: [

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          publicPath: '../../',
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      }

    ]
  },

  plugins: [
    new ExtractTextPlugin('resources/styles/style.css'),
    new DefinePlugin({
      IS_DEV: false,
      __DEV__: false,
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

});
