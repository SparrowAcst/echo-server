
const { proxy } = require("./.config")
const echoServer = require("./echo-server/server")
const proxyServer = require("./src/proxy-server")

const ECHO_PORT = 3001

let needStart = process.argv[2]
if(needStart == "echo"){
	echoServer.listen(ECHO_PORT, console.log(`ECHO Server starts on ${ECHO_PORT} port`));
}
if(needStart == "proxy"){
	proxyServer.listen(proxy.PORT, console.log(`PROXY Server starts on ${proxy.PORT} port`));
}
if(!needStart){
	proxyServer.listen(proxy.PORT, console.log(`PROXY Server starts on ${proxy.PORT} port`));
	echoServer.listen(ECHO_PORT, console.log(`ECHO Server starts on ${ECHO_PORT} port`));
}	