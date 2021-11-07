/* eslint-disable no-unused-vars */
enum ExceptionName {
	UNKNOWN = 'UNKNOWN',
	VALIDATE_FAILED = 'VALIDATE_FAILED',
	REQUEST_INVALID = 'REQUEST_INVALID',
	TOKEN_INVALID = 'TOKEN_INVALID',

	PASSWORD_NOT_MATCH = 'PASSWORD_NOT_MATCH',

	USER_NOT_FOUND = 'USER_NOT_FOUND',
	LINK_TYPE_NOT_SUPPORT = 'LINK_TYPE_NOT_SUPPORT',
}

export default ExceptionName;
