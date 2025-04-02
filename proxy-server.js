const express = require('express');
const createProxyMiddleware = require('http-proxy-middleware');
// const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');
const echoServer = require("./echo-server")

const ECHO_PORT = 3001
const PROXY_PORT = 3000

const proxyServer = express();

const proxyMiddleware = createProxyMiddleware({
    target: `http://127.0.0.1:${ECHO_PORT}`,
    changeOrigin: true,
    cookieDomainRewrite: "127.0.0.1",
    onProxyReq: (proxyReq, req, res) => {
            proxyReq.setHeader('cookie', "user=Andrey Boldak;session=11")

        },
    onProxyRes: (proxyRes, req, res) => {
      res.clearCookie("user")
      res.removeHeader('cookie');     
    }    
})

proxyServer.use('*', proxyMiddleware);

proxyServer.listen(PROXY_PORT, console.log(`PROXY Server starts on ${PROXY_PORT} port`));
echoServer.listen(ECHO_PORT, console.log(`ECHO Server starts on ${ECHO_PORT} port`));