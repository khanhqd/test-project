import ExceptionCode from "src/exceptions/ExceptionCode";
import ExceptionName from "src/exceptions/ExceptionName";
import { ResponseHelper } from "src/helpers/ResponseHelper";
const md5 = require('crypto-js/md5')

const SK = 'remitano-test-exam';

const genSignature = (obj) => {
	let args = Object.keys(obj).sort().map((k) => { return obj[k]; });
	console.log(args.join(''));
	let signature = md5(args.join('') + SK).toString();
	return signature;
}

const verifySignature = function (params: { ts: number, sign: string, [key: string]: any }, req, res) {
	try {
		let _params: any = Object.assign({}, params);
		let now = new Date().getTime();
		if (!params.ts || Math.abs(params.ts - now) > 10000) {
			ResponseHelper.errorResponse({
				req,
				res,
				exception_code: ExceptionCode.REQUEST_INVALID,
				message: ExceptionName.REQUEST_INVALID,
			});
			return false;
		}
		delete _params.sign;
		let _sign = genSignature(_params);
		if (_sign !== params.sign) {
			ResponseHelper.errorResponse({
				req,
				res,
				exception_code: ExceptionCode.REQUEST_INVALID,
				message: ExceptionName.REQUEST_INVALID,
			});
			return false;
		}
		return true;
	} catch (e: any) {
		ResponseHelper.errorResponse({
			req,
			res,
			exception_code: ExceptionCode.REQUEST_INVALID,
			message: e?.message || ExceptionName.REQUEST_INVALID,
		});
		return false;
	}
}

export const verifyRequest = async (req, res, next) => {
	const obj = req.method === 'GET' ? req.query : req.body;
	let verifyRes = await verifySignature(obj, req, res);
	if (!verifyRes) return;
	next();
}
