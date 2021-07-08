const { createProxyMiddleware } = require("http-proxy-middleware");


const protocol = process.env.HTTPS_PROTOCOL ? "https" : "https";

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `${protocol}://${process.env.REACT_APP_URL}`,
      changeOrigin: true,
      pathRewrite: {'^/api' : ''}
    })
  );


  app.use(
    "/auth",
    createProxyMiddleware({
      target: `${protocol}://${process.env.REACT_APP_URL}`,
      changeOrigin: true,
        pathRewrite: {'^/auth' : ''}
    })
  );

  app.use(
    "/chat-api",
    createProxyMiddleware({
      target: `${protocol}://${process.env.REACT_APP_URL}`,
      changeOrigin: true,
    })
  );
};