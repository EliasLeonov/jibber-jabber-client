const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `https://${process.env.REACT_APP_URL}`,
      changeOrigin: true,
      pathRewrite: {'^/api' : ''}
    })
  );


  app.use(
    "/auth",
    createProxyMiddleware({
      target: `https://${process.env.REACT_APP_URL}`,
      changeOrigin: true,
        pathRewrite: {'^/auth' : ''}
    })
  );

  app.use(
    "/chat-api",
    createProxyMiddleware({
      target: `https://${process.env.REACT_APP_URL}`,
      changeOrigin: true,
    })
  );
};