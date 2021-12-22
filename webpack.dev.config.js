const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    path: path.resolve(__dirname, "./example/index.tsx"),
  },
  devtool: "eval-source-map",
  output: {
    path: path.resolve(__dirname, "./example"),
    filename: "bundle.js",
    sourceMapFilename: "[file].map",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          plugins: [
            [
              "import",
              {
                libraryName: "antd",
                libraryDirectory: "lib", // libraryDirectory 默认为 lib
                style: "css",
              },
            ],
          ],
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["css-loader", "sass-loader"],
      },
      {
        test: /\.less$/,
        use: ["css-loader", "less-loader"],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, "./example"),
    compress: true,
    port: 3001, // 启动端口为 3001 的服务
    open: true, // 自动打开浏览器
  },
};
