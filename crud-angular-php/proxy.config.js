const proxy = [{
  context: '/334debcfbdc435a8be6114154ea397098f232757ae4acc3e061186a8b06d20140a32e8a5b03e4018589aa045d697abbe28f2646c7ff2515bf63c0da6b18f71a6',
  target: 'http://localhost:80/api/',
  secure: false,
  changeOrigin: true,
  // logLevel: 'info',
  // protocol: 'https:',
  // port: 443,
  pathRewrite: { '^/334debcfbdc435a8be6114154ea397098f232757ae4acc3e061186a8b06d20140a32e8a5b03e4018589aa045d697abbe28f2646c7ff2515bf63c0da6b18f71a6': '' }
}];

module.exports = proxy;