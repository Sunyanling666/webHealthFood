const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: './pages/community.html',
      filename: 'community.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: './pages/fat_loss.html',
      filename: 'fat_loss.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: './pages/muscle_gain.html',
      filename: 'muscle_gain.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: './pages/recipes.html',
      filename: 'recipes.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: './pages/sugar_control.html',
      filename: 'sugar_control.html',
      chunks: ['main'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        conservativeCollapse: true, // 保留换行
        preserveLineBreaks: true    // 保留换行
      }
    }),
    new HtmlWebpackPlugin({
      template: './pages/supply_chain.html',
      filename: 'supply_chain.html',
      chunks: ['main']
    }),
    new CopyPlugin({
      patterns: [
        { from: 'img', to: 'img', noErrorOnMissing: true},
        { from: 'css', to: 'css' },
        { from: 'js/vendor', to: 'js/vendor' },
        { from: 'icon.svg', to: 'icon.svg' },
        { from: 'favicon.ico', to: 'favicon.ico' },
        { from: 'robots.txt', to: 'robots.txt' },
        //{ from: 'icon.jpg', to: 'icon.jpg' },
        { from: '404.html', to: '404.html' },
        { from: 'site.webmanifest', to: 'site.webmanifest' },
      ],
    }),
  ],
});

