const CryptoJs = require("crypto-js");
const Axios = require("axios");

const sendMessage = (phoneNumber) =>{
	const url = process.env.NCP_SENS_URL;

	const ncp_timestamp = new Date().getTime().toString();

	const ncp_accessKey = process.env.NCP_SENS_ACCESSKEY;
	const ncp_secretKey = process.env.NCP_SENS_SECRETKEY;
	const npc_signiture = process.env.NCP_SENS_SIGNITURE_URL;

	const makeSignature=() => {
		var space = " ";				// one space
		var newLine = "\n";				// new line
		var method = "POST";				// method - post로 바꿔줌. 
		var url = npc_signiture;	// url (include query string) 고쳐야됨. 
		var timestamp = ncp_timestamp;			// current timestamp (epoch)
		var accessKey = ncp_accessKey;			// access key id (from portal or Sub Account)
		var secretKey = ncp_secretKey;			// secret key (from portal or Sub Account)

		var hmac = CryptoJs.algo.HMAC.create(CryptoJs.algo.SHA256, secretKey);
		hmac.update(method);
		hmac.update(space);
		hmac.update(url);
		hmac.update(newLine);
		hmac.update(timestamp);
		hmac.update(newLine);
		hmac.update(accessKey);

		var hash = hmac.finalize();

		return hash.toString(CryptoJs.enc.Base64);
	}


	const header = { //post 형식으로 
	    'Content-Type': 'application/json; charset=utf-8', //Mandatory 반드시 들어가야함.
	    'x-ncp-apigw-timestamp': ncp_timestamp,
	    'x-ncp-iam-access-key': ncp_accessKey,
	    'x-ncp-apigw-signature-v2': makeSignature(),
	};

	const body = {
	    type:"SMS",
	    from:"01065022168",
	    content:`인증번호 ${verifyCode} `,
	    messages:[
	        {
	            to:phoneNumber,
	        }
	    ],
	}

	Axios({ url, method: 'POST', headers:header, data: body})
	.then((res)=> console.log(res))
	.catch((error)=>console.log(error)); 
}

module.exports = { sendMessage };