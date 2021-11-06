const md5 = require('crypto-js/md5')

const SK = 'remitano-test-exam';

const genSignature = (obj) => {
	let args = Object.keys(obj).sort().map((k) => { return obj[k]; });
	console.log(args.join(''));
	let signature = md5(args.join('') + SK).toString();
	return signature;
}

const verifySignature = function (params: { ts: number, sign: string, [key: string]: any }, res) {
	try {
		let _params: any = Object.assign({}, params);
		let now = new Date().getTime();
		if (!params.ts || Math.abs(params.ts - now) > 10000) {
			res.json({ code: 401, message: 'Timestamp is invalid' });
			return false;
		}
		delete _params.sign;
		let _sign = genSignature(_params);
		if (_sign !== params.sign) {
			res.json({ code: 401, message: 'Signature not match' });
			return false;
		}
		return true;
	} catch (e) {
		res.json({ code: 401, message: e });
		return false;
	}
}

export const verifyRequest = async (req, res, next) => {
	const obj = req.method === 'GET' ? req.query : req.body;
	let verifyRes = await verifySignature(obj, res);
	if (!verifyRes) return;
	next();
}
