module.exports = {
  entry : './src/index.js',
  output : {
    path : './dist',
    libraryTarget : 'commonjs2',
    library : 'model-validate',
    filename : 'index.js',
  },
  module : {
    loaders : [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'babel-loader?presets[]=es2015,presets[]=stage-0',
        ],
      },
    ],
  }
}
