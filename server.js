const { createProxyMiddleware } = require("http-proxy-middleware");
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);

    if (req.url.startsWith("/api/generate-image")) {
      console.log(
        `Proxying request for ${req.url} to http://122.160.116.97:8080`
      );
      createProxyMiddleware({
        target: "http://122.160.116.97:8080",
        changeOrigin: true,
        pathRewrite: { "^/api/generate-image": "/generate-image" },
        onProxyReq: (proxyReq, req, res) => {
          console.log(`Proxying ${req.method} request to ${req.url}`);
        },
        onProxyRes: (proxyRes, req, res) => {
          console.log(
            `Received response with status ${proxyRes.statusCode} for ${req.url}`
          );
        },
        onError: (err, req, res) => {
          console.error(`Error during proxying request: ${err.message}`);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end(
            "Something went wrong. And we are reporting a custom error message."
          );
        },
      })(req, res);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
