
const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PRODUCTION = (process.env.NODE_ENV === 'prod');
const CG_STYLE_PATH = process.env.CG_STYLE_PATH;

const srcDir = './static_src';
const compiledDir = './static/assets';

const config = {
  entry: [
    'babel-polyfill',
    `${srcDir}/main.js`
  ],

  output: {
    path: path.resolve(compiledDir),
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.js.map'
  },

  devtool: (PRODUCTION) ? '' : 'eval-source-map',

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread', 'transform-runtime']
        }
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'static_src/css'),
          path.resolve(__dirname, 'node_modules/cloudgov-style'),
          CG_STYLE_PATH || ''
        ],
        loader: ExtractTextPlugin.extract('style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.(svg|ico|png|gif|jpe?g)$/,
        loader: 'url-loader?limit=1024&name=img/[name].[ext]'
      },
      { test: /\.(ttf|woff2?|eot)$/,
        loader: 'url-loader?limit=1024&name=font/[name].[ext]'
      },
      {
        test: /\.json$/,
        loaders: ['json-loader']
      }
    ]
  },

  resolve: {
    alias: {
      'cloudgov-style': 'cloudgov-style'
    },

    modulesDirectories: ['node_modules']
  },

  resolveLoader: {
    fallback: path.resolve(__dirname, 'node_modules')
  },

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],

  publicPath: './static'
};

if (PRODUCTION) {
  config.plugins.push(new webpack.optimize.DedupePlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
