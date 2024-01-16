export interface FormValues {
	[key: string]: any;
}

export interface FormErrors {
	[key: string]: string | null;
}

export interface useFormHandlerProps {
	initialValues: FormValues;
	validate: (values: FormValues) => FormErrors;
}

export interface ContactFormData {
	name: string;
	email: string;
	message: string;
}
