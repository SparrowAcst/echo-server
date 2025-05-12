
const { proxy } = require("./.config")
const proxyServer = require("./src/proxy-server")

proxyServer.listen(proxy.PORT, console.log(`PROXY Server starts on ${proxy.PORT} port`));


// const echoServer = require("./echo-server/server")
// echoServer.listen(3001, console.log(`ECHO Server starts on 3001 port`));
