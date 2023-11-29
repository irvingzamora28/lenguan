import React from 'react';

type Option = {
    value: string;
    label: string;
};

interface DropdownFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    error?: string;
}

const DropdownField: React.FC<DropdownFieldProps> = ({ label, name, value, onChange, options, error }) => (
    <div className="mb-6">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <select
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className={`mt-2 block w-full px-4 py-3 bg-white text-gray-700 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg shadow-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500`}
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
);

export default DropdownField;
