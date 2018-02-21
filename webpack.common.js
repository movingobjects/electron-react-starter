
const path                           = require('path'),
      CopyWebpackPlugin              = require('copy-webpack-plugin'),
      HtmlWebpackPlugin              = require('html-webpack-plugin'),
      HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = {

  entry: {
    app: './app/src/entry.js'
  },

  output: {
    path: path.resolve(__dirname, './app/build'),
    filename: 'resources/scripts/[name].bundle.js'
  },

  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json'
    ],
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ]
  },

  module: {
    rules: [

      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'app')
        ],
        options: {
          presets: ['react'],
          plugins: [
            'transform-object-rest-spread',
            'transform-class-properties'
          ],
        }
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'resources/images/[name].[ext]'
        }
      },

      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'resources/fonts/[name].[ext]'
        }
      },

      {
        test: /\.(mp3|aif|aiff|wav)$/,
        loader: 'file-loader',
        options: {
          name: 'resources/audio/[name].[ext]'
        }
      },

      {
        test: /\.(mp4|webm)$/,
        loader: 'file-loader',
        options: {
          name: 'resources/video/[name].[ext]'
        }
      },

    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'node_modules/react/dist/react.js',
        to: 'resources/scripts/vendor/react/'
      },
      {
        from: 'node_modules/react-dom/dist/react-dom.js',
        to: 'resources/scripts/vendor/react/'
      },
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/src/index.html'
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        'resources/scripts/vendor/react/react.js',
        'resources/scripts/vendor/react/react-dom.js'
      ],
      append: false
    })
  ],

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

};
