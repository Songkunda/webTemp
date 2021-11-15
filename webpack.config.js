const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = ({ production = false }) => {
  const devMode = !production;

  console.log("devMode ", devMode);
  const entry = {
    app: {
      import: path.resolve(__dirname, "src/index")
      // dependOn: ["react-vendors"]
    }
    // new webpack.DllPlugin(options);
    // "react-vendors":["react","react-dom","react-router-dom"]
  };
  const output = {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.[hash:6].js"
  };
  const resolve = {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"]
  };
  return {
    name: devMode ? "dev" : "master",
    mode: devMode ? "development" : "production",
    entry: entry,
    devtool: devMode ? "inline-source-map" : "source-map",
    output: output,
    resolve: resolve,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: ["babel-loader", "ts-loader"]
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          use: ["babel-loader"]
        },
        {
          test: /\.(css|less)$/i,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            // compiles Less to CSS
            {
              loader: "css-loader",
              options: {
                // 解决 css in class 报 export 'default' (imported as 'styles') was not found
                modules: true,
                importLoaders: 2,
                // 0 => 无加载器（默认）;
                // 1 => postcss-loader;
                // 2 => postcss-loader, sass-loader
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader"
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  strictMath: true
                }
              }
            }
          ]
        },
        {
          // 图片资源
          test: /\.(gif|jpg|png|tiff)$/i,
          use: "url-loader?limit=9648&name=[path][name].[ext]&v=[hash]"
        },
        {
          // 字体资源
          test: /\.(woff|woff2|svg|eot|otf|ttf|TTF)$/i,
          use: {
            loader: "file-loader?limit=9648",
            options: {
              name: "[path][name].[ext]&v=[hash:6]",
              outputPath: "font"
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "webpack5 + React +JSX or TSX",
        hash: true,
        meta: {},
        inject: "body",
        injectId: "root"
      }),
      new MiniCssExtractPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
        generateStatsFile: false,
        reportFilename: "../report/report.html"
      }),
      new webpack.WatchIgnorePlugin({
        paths: [/\.d\.ts$/]
      })
    ],
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        minSize: 20000,
        maxSize: 244000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  };
};
