const config = require("config")
const express = require("express")
var app = express()

module.exports.Twilio = express()
module.exports.Twilio.get("/", (request, response) => {
	response.send("test")
})

module.exports.SendGrid = express()
module.exports.SendGrid.get("/", (request, response) => {
	response.send("test")
})


const dbConfig = config.get("Binder.dbConfig")
const twilioAccountSID = config.get("Twilio.ACCOUNT_SID")
const twilioAuthToken = config.get("Twilio.AUTH_TOKEN")

const client = require("twilio")(twilioAccountSID, twilioAuthToken)

// On initialization, make sure we're using the latest set of available numbers
client.incomingPhoneNumbers.list((error, data) => {
	var numbers = []
	for (var i = 0; i < data.incomingPhoneNumbers.length; i++) {
		var number = data.incomingPhoneNumbers[i]
		if (number.phone_number) {
			numbers.push(number)
		}
	}

	// TODO Binder.rotateNumber with numbers array
})




module.exports.Twilio.post("/receive", (request, response) => {
	console.log("Received SMS:")
	console.dir(request.body)
})
