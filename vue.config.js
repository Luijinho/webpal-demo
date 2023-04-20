const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/webpal-demo/'
    : '/',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].minify = false;
      return args;
    });
  }
});
