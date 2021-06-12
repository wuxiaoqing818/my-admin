/*
 * @Author: 吴晓晴
 * @Date: 2021-06-10 21:50:21
 * @LastEditTime: 2021-06-11 21:27:50
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\my-admin\config-overrides.js
 */
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  overrideDevServer
} = require("customize-cra");
const path = require("path");
const webpack = require('webpack');
function resolve(dir) {
  return path.join(__dirname, dir);
}
process.env.CI = "false";
const addCustomize = () => (config) => {
  if (config.output.publicPath) {
    config.output.publicPath =
      process.env.NODE_ENV === "production"
        ? "/react-antd-admin-template/"
        : "/";
  }
  if (config.resolve) {
    config.resolve.extensions.push(".jsx");
  }
  return config;
};



const devServerConfig = () => config => {
  return {
    ...config,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:7001',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    
  };
};

module.exports ={
  webpack: override(
    // 针对antd实现按需打包: 根据import来打包(使用babel-plugin-import)
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true, // 自动打包相关的样式
    }),
  
    // 使用less-loader对源码中的less的变量进行重新指定
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { "@primary-color": "#1DA57A" },
    }),
  
    // 配置路径别名
    addWebpackAlias({
      "@": resolve("src"),
      '@components': resolve('src/components'),
      '@assets': resolve('src/assets'),
      '@pages': resolve('src/pages'),
      '@services': resolve('src/services'),
    }),
    addCustomize()
  ),
  devServer: overrideDevServer(devServerConfig())
}
