
const { DefinePlugin } = require('webpack'),
      merge            = require('webpack-merge'),
      common           = require('./webpack.common.js');

module.exports = merge(common, {

  target: 'electron',
  devtool: 'source-map',

  plugins: [
    new DefinePlugin({
      IS_ELECTRON: true,
      IS_DEV: false,
      __DEV__: false,
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

});
