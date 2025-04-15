
const { proxy } = require("./.config")
const proxyServer = require("./src/proxy-server")

const ECHO_PORT = 3001
const echoServer = require("./echo-server/server")

const FRONT_PORT = 3002
const frontServer = require("./front-server/server")



proxyServer.listen(proxy.PORT, console.log(`PROXY Server starts on ${proxy.PORT} port`));
// echoServer.listen(ECHO_PORT, console.log(`ECHO Server starts on ${ECHO_PORT} port`));
// frontServer.listen(FRONT_PORT, console.log(`FRONT Server starts on ${FRONT_PORT} port`));