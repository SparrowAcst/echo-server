const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const path = require("path")
const PORT = 3000

const app = express()
app.use(express.urlencoded({ extended: true }))
// app.use(
//     cors({
//         origin: '*',
//     }),
// )
app.use(cookieParser())
app.disable('x-powered-by')
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


const getUserAccount = (req, res, next) => {
    try {
    req.userAccount = JSON.parse(req.cookies.userAccount)
    req.userProfile = JSON.parse(req.cookies.userProfile)
    if(req.body && req.body.$$userPhoto){
        req.userProfile.photo = req.body.$$userPhoto
        delete req.body.$$userPhoto
    }    
    
    res.removeHeader("cookie");
    
    } catch (e) {
        console.log("ERROR", e.toString(), e.stack)
    }
    next()
}

app.all('/api/*', getUserAccount, async (req, res) => {


    let authentication = {}

    const authorizationHeader = req.headers.authorization

    if (authorizationHeader) {

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
        remoteIP: req.ip,
        hostname: req.hostname,
        subdomains:req.subdomains,
        headers: req.headers,
        ...authentication,
        cookies: req.cookies,
        method: req.method,
        path: req.path,
        query: req.query,
        body: req.body,
        userAccount: req.userAccount,
        userProfile: req.userProfile,
    })
})


app.use(express.static(path.resolve("./front-server/static")))



// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

module.exports = app
