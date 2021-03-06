module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/prefix": {
        target: "http://39.103.178.157:8080",
        changeOrigin: true,
        pathRewrite: { "^/prefix": "" },
      },
    },
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.plugin("CompressionPlugin").use("compression-webpack-plugin");
    }
  },
};
