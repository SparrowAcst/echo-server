const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

const PORT = 3000

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(
    cors({
        origin: '*',
    }),
)
app.use(cookieParser())
app.disable('x-powered-by')
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.all('/*', async (req, res) => {

    let authentication = {}

    const authorizationHeader = req.headers.authorization

    if (authorizationHeader) {
        // if value starts with "Basic "
        if (authorizationHeader.startsWith('Basic ')) {
            const token = authorizationHeader.split(' ')[1]

            authentication = {
                authentication: {
                    type: 'http.basic',
                    token,
                    value: Buffer.from(token, 'base64').toString('utf8'),
                },
            }
        }

        if (authorizationHeader.startsWith('Bearer ')) {
            const token = authorizationHeader.split(' ')[1]

            authentication = {
                authentication: {
                    type: 'http.bearer',
                    token,
                },
            }
        }
    }

    res.send({
        headers: req.headers,
        ...authentication,
        cookies: req.cookies,
        method: req.method,
        path: req.path,
        query: req.query,
        body: req.body,
    })
})

module.exports = app
// .listen(PORT, console.log(`** ECHO Server starts at port ${PORT}`))