module.exports = {
  baseUrl: '/', // 主要改这
  outputDir: 'dist',
  lintOnSave: true,
  runtimeCompiler: true,
  chainWebpack: () => {},
  configureWebpack: () => {},
  devServer: {
    proxy: {
      '/goods': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
      }
    }
  }
}