const { createProxyMiddleware } = require("http-proxy-middleware");


const protocol = process.env.HTTPS_PROTOCOL ? "https" : "http";

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `${protocol}://localhost:9001`,
      changeOrigin: true,
      pathRewrite: {'^/api' : ''}
    })
  );


  app.use(
    "/auth",
    createProxyMiddleware({
      target: `${protocol}://localhost:9000`,
      changeOrigin: true,
        pathRewrite: {'^/auth' : ''}
    })
  );

  app.use(
    "/chat-api",
    createProxyMiddleware({
      target: `${protocol}://localhost:9002`,
      changeOrigin: true,
    })
  );
};