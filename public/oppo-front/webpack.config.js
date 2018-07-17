module.exports = {
  entry: [
    // './js/jquery.min.js',
    './js/html2canvas/0.4.1/html2canvas.min.js',
    './js/mobile-util.js',
    './js/awardRotate.js',
    // './js/pagination.full.min.js',
    // './js/preloadjs-0.6.2.min.js',
    // './js/lazyload.min.js',
    // "./js/app.js",
  ],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  }
};