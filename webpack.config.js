const webpack = require('webpack');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

// const path = require('path');
// const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/** https://github.com/kangax/html-minifier#options-quick-reference */
const webpackMinifyOptions = {
  collapseWhitespace: true,
  conservativeCollapse: true,
  caseSensitive: true,
  minifyCSS: true,
  minifyJS: true
}

module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  // devtool: isProd ? 'hidden-source-map' : 'source-map',
  context: path.join(__dirname, './client'),
  entry: {
    // './about/index': './about/index',
    // './art/index': './art/index',
    // './blog/index': './blog/index',
    // './experiments/index': './experiments/index',
    // 'games': './games/index',
    // './music/index': './music/index',
    // './index/index': './index/index'
    'elevator-with-sidebar' : './lib/elevator-with-sidebar/index',
    'defer-images' : './lib/defer-images/index'
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].entry.js",
    chunkFilename: "[id].chunk.js"
  },
  // devtool: 'source-map',
  // devtool: 'eval',
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    }),
    new CopyWebpackPlugin([
      {
        from: 'lib/elevator/ding.mp3',
        to: 'shared-assets/ding.mp3'
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: 'lib/elevator/FullMoonSamba2.mp3',
        to: 'shared-assets/FullMoonSamba2.mp3'
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: 'experiments/img',
        to: 'experiments/img'
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: 'games/img',
        to: 'games/img'
      }
    ]),
    new HtmlWebpackPlugin({
      chunks: ['defer-images', 'elevator-with-sidebar'],
      filename: 'experiments/index.html',
      template: 'experiments/index.html',
        minify: webpackMinifyOptions
    }),
    new HtmlWebpackPlugin({
      chunks: ['defer-images', 'elevator-with-sidebar'],
      filename: 'games/index.html',
      template: 'games/index.html',
      inject: 'body',
      minify: webpackMinifyOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'art/index.html',
      template: 'art/index.html',
      inject: 'body',
      minify: webpackMinifyOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'about/index.html',
      template: 'about/index.html',
      inject: 'body',
      minify: webpackMinifyOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'blog/index.html',
      template: 'blog/index.html',
      inject: 'body',
      minify: webpackMinifyOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'music/index.html',
      template: 'music/index.html',
      inject: 'body',
      minify: webpackMinifyOptions
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index/index.html',
      inject: 'body',
      minify: webpackMinifyOptions
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "commons",
    //   filename: "commons.js"
    // }),
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
      sourceMap: !isProd
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
      // {
      //   test: /\.html$/,
      //   loader: 'file',
      //   query: {
      //     name: '[name].[ext]'
      //   }
      // },
      {
          test: require.resolve("bootstrap/dist/js/umd/scrollspy"),
          loader: "imports?define=>false"
      },
      {
          test: require.resolve("bootstrap/dist/js/umd/util"),
          loader: "imports?define=>false"
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