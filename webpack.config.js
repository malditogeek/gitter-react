var ET = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: './public/main.jsx'
  },
  output: {
    filename: './public/build/[name].js'
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx-loader?harmony'},
      {test: /\.less$/, loader: ET.extract('style-loader', 'css-loader!less-loader')},
      {test: /\.css$/, loader: ET.extract('style-loader', 'css-loader')},
    ]
  },
  resolve: {
    extensions: ['', '.json', '.js', '.jsx'] 
  },
  plugins: [
    new ET("./public/build/[name].css")
  ]
};
