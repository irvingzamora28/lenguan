import { useState, ChangeEvent, FormEvent } from "react";
import { FormErrors, FormValues, useFormHandlerProps } from "../types/form";

const useFormHandler = ({ initialValues, validate }: useFormHandlerProps) => {
	const [values, setValues] = useState<FormValues>(initialValues);
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
		setErrors({ ...errors, [name]: validate({ ...values, [name]: value })[name] });
	};

	const handleSubmit = (callback: (values: FormValues) => void) => async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);
		const validationErrors = validate(values);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			await callback(values); // Assuming callback returns a Promise
		}
		setIsSubmitting(false);
	};

	const reset = () => {
		setValues(initialValues);
	};

	return { values, handleChange, handleSubmit, errors, reset, isSubmitting };
};

export default useFormHandler;
