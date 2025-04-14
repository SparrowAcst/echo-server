
const createProxyMiddleware = require('http-proxy-middleware');



const createMidlleware = target => createProxyMiddleware({
    
    target: `${target.host}:${target.port}`,
    
    changeOrigin: true,
    cookieDomainRewrite: `${target.host}`,
    
    onProxyReq: (proxyReq, req, res) => {
        
        console.log(target.host, req.method, req.originalUrl)
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

    onProxyRes: (proxyRes, req, res) => {
        // console.log("RESPONSE")
    }

})


module.exports = createMidlleware
