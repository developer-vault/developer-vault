const webpack = require('webpack');

// Ignore all locale files of moment.js
module.exports.ignoreMomentLocales = new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/);
