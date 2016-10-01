const config = require("config")
const express = require("express")
const formidable = require("formidable")

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

const twilio = require("twilio")
const twilioClient = require("twilio")(twilioAccountSID, twilioAuthToken)

// On initialization, make sure we're using the latest set of available numbers
twilioClient.incomingPhoneNumbers.list((error, data) => {
	var numbers = []
	for (var i = 0; i < data.incomingPhoneNumbers.length; i++) {
		var number = data.incomingPhoneNumbers[i]
		if (number.phone_number) {
			numbers.push(number)
		}
	}

	// TODO Binder.rotateNumber with numbers array
})

module.exports.Twilio.post("/sms/receive", (request, response) => {
	let form = new formidable.IncomingForm()
	form.parse(request, (error, fields) => {
		console.log("Received SMS:")
		console.dir(fields)
	})

	response.sendStatus(200)
})

module.exports.Twilio.post("/call/receive", (request, response) => {
	console.log("Received SMS:")
	console.dir(request)
	let clientResponse = new twilio.TwimlResponse()
	clientResponse.say("Test Response", {
		voice: "woman",
		language: "en-gb"
	})

	response.send(clientResponse.toString())
})
