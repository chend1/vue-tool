
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const resolve = dir => path.join(__dirname, dir)
module.exports ={
  lintOnSave: false,
  // 关闭生产环境的sourcemap
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  // 开启gzip压缩
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 10240,
            deleteOriginalAssets: false
          })
          // new UglifyJsPlugin({
          //   uglifyOptions: {
          //     compress: {
          //       warnings: false,
          //       drop_debugger: true, // console
          //       drop_console: true,
          //       pure_funcs: ['console.log'] // 移除console
          //     }
          //   },
          //   sourceMap: false,
          //   parallel: true
          // })
        ]
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
    config.plugin('html').tap(args => {
      args[0].title = 'ris工作站'
      return args
    })
    // 配置 全局 less 加载前的变量
    // npm i sass-resources-loader -s
    const oneOfsMap = config.module.rule('less').oneOfs.store
    oneOfsMap.forEach((item) => {
      item.use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: resolve('src') + '/assets/css/config.less'
        })
        .end()
    })
  },
}