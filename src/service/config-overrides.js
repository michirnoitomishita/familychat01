const webpack = require('webpack');

module.exports = function override(config, env) {
  // ポリフィルの設定を追加
  config.resolve.fallback = {
    ...config.resolve.fallback,
    https: require.resolve('https-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert/'),
    crypto: require.resolve('crypto-browserify'),
    path: require.resolve('path-browserify'),
    util: require.resolve('util/'),
  };

  // webpackプラグインを追加
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  );

  return config;
};
