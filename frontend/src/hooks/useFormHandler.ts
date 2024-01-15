import { useState, ChangeEvent, FormEvent } from "react";
import { FormErrors, FormValues, useFormHandlerProps } from "../types/form";

const useFormHandler = ({ initialValues, validate }: useFormHandlerProps) => {
	const [values, setValues] = useState<FormValues>(initialValues);
	const [errors, setErrors] = useState<FormErrors>({});

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
		setErrors({ ...errors, [name]: validate({ ...values, [name]: value })[name] });
	};

	const handleSubmit = (callback: (values: FormValues) => void) => (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const validationErrors = validate(values);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			callback(values);
		}
	};

	const reset = () => {
		setValues(initialValues);
	};

	return { values, handleChange, handleSubmit, errors, reset };
};

export default useFormHandler;
