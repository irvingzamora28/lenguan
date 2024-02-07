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

export interface FeedbackFormData {
	usability?: string;
	feature_request?: string;
	learning_materials?: string;
	new_languages?: string;
	course_pace?: string;
	general_feedback: string;
}
