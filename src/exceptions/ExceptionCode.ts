/* eslint-disable no-unused-vars */
enum ExceptionCode {
	UNKNOWN = 1,
    VALIDATE_FAILED = 2,
	REQUEST_INVALID = 403,
	TOKEN_INVALID = 401,

    PASSWORD_NOT_MATCH = 101,

	USER_NOT_FOUND = 201,
	LINK_TYPE_NOT_SUPPORT = 202,
}

export default ExceptionCode;
