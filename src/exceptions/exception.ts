import ExceptionCode from './ExceptionCode';

class Exception extends Error {
    public code: number;
    public status_code: number;

    constructor(message: string, code: ExceptionCode = ExceptionCode.UNKNOWN, status_code: number = 500) {
        super(message);

        this.name = 'Exception';
        this.code = code;

        this.status_code = status_code;
    }
}

export default Exception;
