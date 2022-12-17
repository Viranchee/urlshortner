const nodepoly = require('@esbuild-plugins/node-globals-polyfill').default

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: 'cloudflare-workers',
  server: './server.js',
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['.*'],

  esbuildOverride: (option, { isServer, isDev }) => {
    option.plugins = option.plugins || []
    option.plugins.push(nodepoly({ buffer: true }))

    option.define = option.define || {}
    option.define.global = 'globalThis'

    return option
  }
}
// module.exports = {
//   serverBuildTarget: "cloudflare-pages",
//   server: "./server.js",
//   devServerBroadcastDelay: 1000,
//   ignoredRouteFiles: ["**/.*"],
//   // appDirectory: "app",
//   // assetsBuildDirectory: "public/build",
//   // serverBuildPath: "functions/[[path]].js",
//   // publicPath: "/build/",
// };
