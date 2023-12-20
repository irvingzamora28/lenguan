import React, { useState, useEffect, useCallback } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TestimonialCardProps } from "../../../types/props";
import TestimonialCard from "../Cards/TestimonialCard";

interface TestimonialCarouselProps {
	testimonials: TestimonialCardProps[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isExiting, setIsExiting] = useState(false);

	const TRANSITION_INTERVAL = 8000;

	const resetAndNavigate = useCallback((index: number) => {
		setIsExiting(true);
		setTimeout(() => {
			setIsExiting(false);
			setActiveIndex(index);
		}, 300); // transition duration
	}, []);

	const handlePrev = useCallback(() => {
		const newIndex = activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
		resetAndNavigate(newIndex);
	}, [activeIndex, testimonials.length, resetAndNavigate]);

	const handleNext = useCallback(() => {
		const newIndex = (activeIndex + 1) % testimonials.length;
		resetAndNavigate(newIndex);
	}, [activeIndex, testimonials.length, resetAndNavigate]);

	useEffect(() => {
		const interval = setInterval(() => {
			handleNext();
		}, TRANSITION_INTERVAL);

		return () => clearInterval(interval);
	}, [handleNext]);

	return (
		<div className="flex items-center justify-center">
			<IoIosArrowBack className="cursor-pointer" onClick={handlePrev} size={30} />
			<div className={`transition-all duration-300 ${isExiting ? "opacity-0" : "opacity-100"}`}>
				<TestimonialCard {...testimonials[activeIndex]} />
			</div>
			<IoIosArrowForward className="cursor-pointer" onClick={handleNext} size={30} />
		</div>
	);
};

export default TestimonialCarousel;
