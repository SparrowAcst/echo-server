const { createProxyMiddleware } = require('http-proxy-middleware');



const createMidlleware = proxy => {

    console.table(proxy.targets)

    return createProxyMiddleware({

        // target: `https://127.0.0.1`,

        changeOrigin: true,
        // cookieDomainRewrite: `${target.host}`,

        router: req => {
            let originalUrl = req.originalUrl
            for (let target of proxy.targets) {
                if (new RegExp(target.path.replace("*", ".*")).test(originalUrl)) {
                    return target.host
                }
            }
            return
        },


        pathRewrite: (path, req) => {

            let originalUrl = req.originalUrl

            for (let target of proxy.targets) {
                if (new RegExp(target.path.replace("*", ".*")).test(originalUrl) && target.pathRewrite) {
                    let newPath = path.replace(new RegExp(target.pathRewrite[0].replace("*", ".*")), target.pathRewrite[1])
                    console.log(`REDIRECT ${req.headers.host}${path} -> ${target.host}${newPath}`)
                    return newPath
                }
                console.log(`REDIRECT ${req.headers.host}${path} -> ${target.host}${path}`)
                return path
            }

            return path
        },

        on: {
            proxyReq: (proxyReq, req, res) => {

                proxyReq.setHeader('cookie', `userAccount=${JSON.stringify(req.session.account)}; userProfile=${JSON.stringify(req.session.userProfile)}`)

                if (
                    ["POST", "PUT"].includes(req.method) &&
                    req.body
                ) {

                    let body
                    if (req.body) {
                        req.body.$$userPhoto = req.session.userPhoto
                        body = JSON.stringify(req.body)
                        delete req.body;
                    }

                    if (body) {
                        proxyReq.setHeader('content-length', Buffer.byteLength(body));
                        // Write out body changes to the proxyReq stream
                        proxyReq.write(body);
                        proxyReq.end();
                    }
                }

            },

            proxyRes: (proxyRes, req, res) => {
                // console.log("RESPONSE")
            }
        }

    })
}


module.exports = createMidlleware