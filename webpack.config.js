const webpack = require("webpack")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const globImporter = require("node-sass-glob-importer")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const ManifestPlugin = require("webpack-manifest-plugin")

const ENV = process.env.NODE_ENV || "development"
const isProd = ENV === "production"
const output = "public/packs"

module.exports = {
  mode: ENV,
  entry: {
    main: ["./frontend/js/main.js", "./frontend/scss/main.scss"]
  },
  output: {
    filename: "[name]-[hash].js",
    publicPath: "/packs/",
    path: path.resolve(__dirname, output)
  },
  plugins: [
    new CleanWebpackPlugin([output]),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css",
      allChunks: false
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(ENV)
    }),
    new ManifestPlugin({
      fileName: "manifest.json",
      publicPath: "/packs/",
      writeToFileEmit: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")({ grid: true })].concat(
                isProd ? [require("css-mqpacker"), require("cssnano")] : []
              )
            }
          },
          {
            loader: "sass-loader",
            options: {
              importer: globImporter()
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".css", ".scss"]
  },
  devServer: {
    contentBase: "public/packs",
    host: "0.0.0.0",
    historyApiFallback: true,
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
}
