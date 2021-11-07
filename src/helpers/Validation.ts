import Joi from 'joi';
import Exception from 'src/exceptions/exception';
import ExceptionCode from 'src/exceptions/ExceptionCode';

export const validate = (input) => {
	const valid = (joiSchema: { [k: string]: Joi.SchemaLike | Joi.SchemaLike[] }) => {
		const schema = Joi.object(joiSchema);

		const { error, value } = schema.validate(input, {
			allowUnknown: true,
		});

		if (error) {
			throw new Exception(`Validation error: ${error.message}`, ExceptionCode.VALIDATE_FAILED);
		}

		return value;
	};

	return {
		valid,
	};
};
