const crypto = require('crypto-js');
const uuid = require('uuid');


function getNonceHeader() {
	return uuid.v4()
}

function getDateHeader() {
	const timestamp = new Date().toUTCString();
	return timestamp
}

function getAuthHeader(date, nonce, apiKey, hmacSecret) {
	const signature = `date: ${date}\nx-mod-nonce: ${nonce}`;
	console.log(`Raw signature string is: ${signature}`);


	const signatureSigned = crypto.HmacSHA1(signature, hmacSecret);
	console.log(`Signature signed: ${signatureSigned}`)

	const signatureEncoded = encodeURIComponent(crypto.enc.Base64.stringify(signatureSigned));
	console.log(`Signature encoded: ${signatureEncoded}`)

	const header = `Signature keyId="${apiKey}",algorithm="hmac-sha1",headers="date x-mod-nonce",signature="${signatureEncoded}"`;
	console.log(`Header: ${header}`)

	return header

}


module.exports.requestHooks = [
	(context) => {
		console.log('Adding Modulr auth headers')
		const apiKey = context.request.getEnvironmentVariable('api_key')
		const hmacSecret = context.request.getEnvironmentVariable('hmac_secret')

	 	console.log(`api key: ${apiKey}, hmac secret: ${hmacSecret}`)

		const nonce = getNonceHeader()
		console.log(nonce)

		const date = getDateHeader()
		console.log(date)

		const authHeader = getAuthHeader(date, nonce, apiKey, hmacSecret)
		console.log(authHeader)


		context.request.setHeader('x-mod-nonce', nonce);
		context.request.setHeader('Date', date);
		context.request.setHeader('Authorization', authHeader);
	}
]
