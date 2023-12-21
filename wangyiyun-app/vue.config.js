const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// const { VantResolver } = require('@vant/auto-import-resolver');
// const ComponentsPlugin = require('unplugin-vue-components/webpack');

// module.exports = {
//   configureWebpack: {
//     plugins: [
//       ComponentsPlugin({
//         resolvers: [VantResolver()],
//       }),
//     ],
//   },
// };
