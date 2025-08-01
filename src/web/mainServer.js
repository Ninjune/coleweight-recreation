const { default: axios } = require("axios")
const fs = require("fs")
const { website } = require("./express")
const privateKey = fs.readFileSync("/app/certs/privkey.pem", "utf8")
const certificate = fs.readFileSync("/app/certs/fullchain.pem", "utf8")
const credentials = {key: privateKey, cert: certificate}
const httpServer = require("http").createServer()
const httpsServer = require("https").createServer(credentials)

httpServer.on("request", website)
httpsServer.on("request", website)

httpServer.listen(80)
httpsServer.listen(443)

module.exports = { httpServer, httpsServer }
