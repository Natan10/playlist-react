const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '/src/index.tsx'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module:{
    rules:[
      {
        test: /\.ts(x?)$/,
        use: "ts-loader",
        exclude: /node_modules/
      },{
        test: /\.scss$/,
        use:['style-loader','css-loader','sass-loader']
      }, 
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.(png|jpe?g|mp3)$/i,
        loader: 'file-loader',
        options:{
          name: 'assets/[contenthash].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx",".ts",".js","scss"],
  },
  devServer:{
    static: 'public', 
    historyApiFallback: true,
  }

}