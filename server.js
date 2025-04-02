const echoServer = require("./echo-server")
const ECHO_PORT = 80
echoServer.listen(ECHO_PORT, console.log(`ECHO Server starts on ${ECHO_PORT} port`));