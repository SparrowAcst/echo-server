
const { proxy } = require("./.config")
const proxyServer = require("./src/proxy-server")

proxyServer.listen(proxy.PORT, console.log(`PROXY Server starts on ${proxy.PORT} port`));
