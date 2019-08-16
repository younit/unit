module.exports = {
  baseUrl: '/', // 主要改这
  outputDir: 'dist',
  lintOnSave: true,
  runtimeCompiler: true,
  chainWebpack: () => {},
  configureWebpack: () => {},
  devServer: {
    port: 10010,
    // proxy: {
    //   '*': {
    //     target: 'http://58.37.57.242:3000',
    //     changeOrigin: true
    //   }
    // }
  }
}

