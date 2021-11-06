import ExceptionCode from "src/exceptions/ExceptionCode";
import { Request, Response, NextFunction } from 'express';
import { ResponseHelper } from "src/helpers/ResponseHelper";

export const catchError = (err: { message?: string, code?: number, status_code?: number, stack: any }, req: Request, res: Response, next: NextFunction) => {
	const defaultMessage = `Something went wrong`;
	const defaultExceptionCode = ExceptionCode.UNKNOWN;
	let message = '';
	let exceptionCode: number = 0;
	let statusCode = 0;

	if (err.message) {
		message = err.message;
	}

	if (err.code) {
		exceptionCode = err.code;
	}

	if (err.status_code) {
		statusCode = err.status_code;
	}

	return ResponseHelper.errorResponse({
		req,
		res,
		status_code: statusCode,
		message: message || defaultMessage,
		exception_code: exceptionCode || defaultExceptionCode,
	});
};

