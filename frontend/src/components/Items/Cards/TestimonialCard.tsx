import React from "react";
import { TestimonialCardProps } from "../../../types/props";

const TestimonialCard: React.FC<TestimonialCardProps> = ({ image, name, designation, testimonial }) => (
	<div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 m-4">
		<img className="w-16 h-16 rounded-full mx-auto" src={image} alt={name} />
		<div className="text-center mt-4">
			<p className="text-lg leading-tight font-medium">{name}</p>
			<p className="text-gray-600">{designation}</p>
			<p className="mt-4 text-gray-700 text-sm">{testimonial}</p>
		</div>
	</div>
);

export default TestimonialCard;
