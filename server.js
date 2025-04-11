
const { proxy } = require("./.config")
const echoServer = require("./echo-server/server")
const proxyServer = require("./src/proxy-server")

const ECHO_PORT = 3001

proxyServer.listen(proxy.PORT, console.log(`PROXY Server starts on ${proxy.PORT} port`));
// echoServer.listen(ECHO_PORT, console.log(`ECHO Server starts on ${ECHO_PORT} port`));