const webpack = require('webpack');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

// const path = require('path');
// const webpack = require('webpack');



module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  context: path.join(__dirname, './client'),
  entry: {
    './about/index': './about/index',
    './art/index': './art/index',
    './blog/index': './blog/index',
    './experiments/index': './experiments/index',
    './games/index': './games/index',
    './music/index': './music/index',
    './index/index': './index/index'
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].entry.js",
    chunkFilename: "[id].chunk.js"
  },
  devtool: 'source-map',
  // devtool: 'eval',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "commons.js"
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        space_colon: false,
        comments: function(node, comment) {
            var text = comment.value;
            var type = comment.type;
            if (type == "comment2") {
                // multiline comment
                return /@copyright/i.test(text);
            }
        }
      },
      sourceMap: false
    }),
    // new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    })
  ],
  devServer: {
    contentBase: './client'
    // hot: true
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          "cacheDirectory": "cache"
        }
      }
    ]
  }
};