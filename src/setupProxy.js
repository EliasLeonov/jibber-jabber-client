const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:9001",
      changeOrigin: true,
      pathRewrite: {'^/api' : ''}
    })
  );


  app.use(
    "/auth",
    createProxyMiddleware({
      target: "http://localhost:9000",
      changeOrigin: true,
        pathRewrite: {'^/auth' : ''}
    })
  );

  app.use(
    "/chat",
    createProxyMiddleware({
      target: "http://localhost:9002",
      changeOrigin: true,
        pathRewrite: {'^/chat' : ''}
    })
  );
};