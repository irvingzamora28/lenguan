import React from "react";

interface InputFieldProps {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, type = "text", placeholder = "" }) => (
	<div className="mb-6">
		<label htmlFor={name} className="block text-sm font-medium text-gray-700">
			{label}
		</label>
		<input
			type={type}
			name={name}
			id={name}
			value={value}
			onChange={onChange}
			className="mt-2 block w-full px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
		/>
	</div>
);

export default InputField;
