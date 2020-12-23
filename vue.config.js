// const autoprefixer = require('autoprefixer');
const pxtoviewport = require('postcss-px-to-viewport')

module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist/' + process.env.VUE_APP_BUILD_TYPE,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // compiler: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {},
  configureWebpack: () => {},
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      less: {
        lessOptions: {
          // vant 修改默认主题
          modifyVars: {
            'font-size-sm': '13px',
            'font-size-md': '15px',
            'font-size-lg': '17px',
            'button-primary-color': '#ffffff',
            'button-primary-background-color': '#5EC3D9',
            'button-primary-border-color': '#5EC3D9',
            'button-default-color': '#ffffff',
            'button-default-background-color': '#5ED9BD',
            'button-default-border-color': '#5ED9BD',
            'nav-bar-background-color': '#5EC3D9',
            'nav-bar-icon-color': '#ffffff',
            'nav-bar-text-color': '#ffffff',
            'nav-bar-title-text-color': '#ffffff',
            'tab-active-text-color': '#5EC3D9',
            'tabs-bottom-bar-color': '#5EC3D9'
          }
        }
      },
      
      postcss: {
        plugins: [
          // autoprefixer(),
          // pxtoviewport({
          //   viewportWidth: 375
          // })
        ]
      }
    }
    // // 启用 CSS modules for all css / pre-processor files.
    // requireModuleExtension: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: false, //浏览器自动打开页面
    host: '0.0.0.0', //如果是真机测试，就使用这个IP
    port: 8000,
    https: false,
    hotOnly: false, //热更新（webpack已实现了，这里false即可）
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API,
        ws: true,
        changeOrigin: true
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {}
}
