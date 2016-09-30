// NPM dependencies
const config = require("config")
const express = require("express")
// Lib dependencies
const main = require("./anonymouse-io")

const app = express()
// Twilio and SendGrid are currently the only supported providers
app.use("/v1/sms/", main.Twilio)
app.use("/v1/email/", main.SendGrid)

// Default to port 80
// TODO TLS
var port = 80
if (config.has("Server.port")) {
	var port = config.get("Server.port")
}

const server = app.listen(port, () => {
	console.log("Server started listening on port %d", server.address().port)
})
