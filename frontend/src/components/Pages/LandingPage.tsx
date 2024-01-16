import React from "react";
import "../../assets/scss/pages/LandingPage.scss";
import TestimonialCard from "../Items/Cards/TestimonialCard";
import TestimonialCarousel from "../Items/Misc/TestimonialCarousel";
import { testimonials } from "../../constants/testimonials";
import "../../assets/scss/globals.scss";
import { Link } from "react-router-dom";
import useUserGuestLogin from "../../hooks/useUserGuestLogin";
import useFormHandler from "../../hooks/useFormHandler";
import { ContactFormData, FormErrors, FormValues } from "../../types/form";
import { FormSubmitService } from "../../services/FormSubmitService";
import { ToastContainer, toast } from "react-toastify";

const LandingPage: React.FC = () => {
	const { handleLoginAsGuest } = useUserGuestLogin();

	const handleNavLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		event.preventDefault();
		const href = event.currentTarget.getAttribute("href");
		const section = document.querySelector(href!);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	};

	const validateContactForm = (values: FormValues): FormErrors => {
		let errors: FormErrors = {};

		if (!values.email) {
			errors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(values.email)) {
			errors.email = "Email address is invalid";
		}
		if (!values.name) {
			errors.name = "Name is required";
		}

		return errors;
	};

	const formInitialValues = {
		name: "",
		email: "",
		message: "",
	};

	const { values, handleChange, handleSubmit, errors, reset, isSubmitting } = useFormHandler({
		initialValues: formInitialValues,
		validate: validateContactForm,
	});

	const submitForm = async (formData: FormValues) => {
		console.log(formData);
		const submitData: ContactFormData = {
			name: formData.name,
			email: formData.email,
			message: formData.message,
		};
		const response = await FormSubmitService.submit(submitData);
		if (response?.data.success) {
			toast.success("Thanks for leaving a message. We will contact you soon! 😊", {
				position: "top-right",
				autoClose: 5000,
			});
			reset();
		} else {
			toast.error("There was an error submitting the form. Please try again later.", {
				position: "top-right",
				autoClose: 5000,
			});
		}
		const section = document.querySelector("#welcome");
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div>
			<ToastContainer />
			<header className="flex flex-wrap justify-between items-center p-6 md:flex-row flex-col">
				<h1 className="text-2xl font-bold mb-2 md:mb-0 text-primary-800">Lenguan</h1>
				<nav>
					<ul className="flex space-x-4 mt-2 md:mt-0">
						<li>
							<a href="#features" onClick={handleNavLinkClick} className="text-lg text-slate-700 md:text-xl font-semibold hover:text-primary-500 transition duration-300 ease-in-out">
								Features
							</a>
						</li>
						<li>
							<a href="#languages" onClick={handleNavLinkClick} className="text-lg text-slate-700 md:text-xl font-semibold hover:text-primary-500 transition duration-300 ease-in-out">
								Languages
							</a>
						</li>
						<li>
							<a href="#testimonials" onClick={handleNavLinkClick} className="text-lg text-slate-700 md:text-xl font-semibold hover:text-primary-500 transition duration-300 ease-in-out">
								Testimonials
							</a>
						</li>
						<li>
							<a href="#contact" onClick={handleNavLinkClick} className="text-lg text-slate-700 md:text-xl font-semibold hover:text-primary-500 transition duration-300 ease-in-out">
								Contact
							</a>
						</li>
					</ul>
				</nav>
				<div className="mt-6 md:mt-0 flex space-x-4">
					<Link to="/register" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
						Register
					</Link>
					<Link to="/login" className="bg-secondary-500 hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded">
						Log in
					</Link>
				</div>
			</header>

			<section id="welcome" className="bg-cover bg-center h-screen relative title_image">
				<div className="flex items-center justify-center h-full">
					<div className="text-center text-white">
						<h2 className="text-6xl md:text-7xl font-bold title_text-outline">Welcome to Lenguan</h2>
						<p className="mt-4 text-2xl md:text-3xl title_text-outline">Your journey to language mastery starts here!</p>
						<button
							onClick={handleLoginAsGuest}
							className="mt-8 bg-accent-500 hover:bg-accent-600 text-white text-shadow font-bold py-6 px-8 rounded-full text-3xl sm:text-4xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
						>
							Try as Guest
						</button>
					</div>
				</div>
			</section>

			{/* Current Features Section */}
			<section id="features" className="p-10 md:p-20">
				<h3 className="text-4xl md:text-5xl font-bold text-center text-slate-700">Our Features</h3>
				<div className="flex flex-wrap justify-around mt-10">
					<div className="w-full md:w-1/3 p-4">
						<img src="src/assets/images/feature-lessons.png" alt="Language Lessons" className="w-full h-auto mb-3" />
						<h4 className="text-lg md:text-xl font-bold text-slate-700">Language Lessons</h4>
						<p className="text-slate-500">Comprehensive lessons across various languages.</p>
					</div>
					<div className="w-full md:w-1/3 p-4">
						<img src="src/assets/images/feature-exercises.png" alt="Practice Exercises" className="w-full h-auto mb-3" />
						<h4 className="text-lg md:text-xl font-bold text-slate-700">Practice Exercises</h4>
						<p className="text-slate-500">Interactive exercises to enhance language skills.</p>
					</div>
					<div className="w-full md:w-1/3 p-4">
						<img src="src/assets/images/feature-challenges.png" alt="Language Game Challenges" className="w-full h-auto mb-3" />
						<h4 className="text-lg md:text-xl font-bold text-slate-700">Language Game Challenges</h4>
						<p className="text-slate-500">Fun and engaging games to practice languages.</p>
					</div>
				</div>
			</section>

			{/* Upcoming Features Section */}
			<section id="upcoming-features" className="bg-gray-100 p-10 md:p-20">
				<h3 className="text-4xl md:text-5xl font-bold text-center text-slate-700">Upcoming Features</h3>
				<div className="flex flex-wrap justify-around mt-10">
					<div className="w-full md:w-1/3 p-4">
						<img src="src/assets/images/future-feature-leaderboards.png" alt="Leaderboards" className="w-full h-auto mb-3 scale-125" />
						<h4 className="text-lg md:text-xl font-bold text-slate-700">Leaderboards</h4>
						<p className="text-slate-500">Track your progress and compete with others.</p>
					</div>
					<div className="w-full md:w-1/3 p-4">
						<img src="src/assets/images/future-feature-speech.png" alt="Speech Recognition Challenges" className="w-full h-auto mb-3" />
						<h4 className="text-lg md:text-xl font-bold text-slate-700">Speech Recognition Challenges</h4>
						<p className="text-slate-500">Improve pronunciation and listening skills using advanced speech recognition technology.</p>
					</div>
					<div className="w-full md:w-1/3 p-4">
						<img src="src/assets/images/future-feature-friend-requests.png" alt="Friend Requests" className="w-full h-auto mb-3" />
						<h4 className="text-lg md:text-xl font-bold text-slate-700">Friend Requests</h4>
						<p className="text-slate-500">Connect with other learners, make friends and practice languages together.</p>
					</div>
					<div className="w-full md:w-1/3 p-4">
						<img src="src/assets/images/future-feature-games.png" alt="Multi-player Challenges" className="w-full h-auto mb-3" />
						<h4 className="text-lg md:text-xl font-bold text-slate-700">Multi-player Challenges</h4>
						<p className="text-slate-500">Engage in fun, interactive multi-player games and challenges to enhance learning.</p>
					</div>
				</div>
			</section>

			{/* Language Offerings Section */}
			<section id="languages" className="p-10 md:p-20">
				<h3 className="text-4xl md:text-5xl font-bold text-center text-slate-700">Languages We Offer</h3>
				<div className="flex flex-wrap justify-around mt-10">
					<div className="w-full md:w-1/3 p-4 pt-8">
						<img src="src/assets/images/language-english.png" alt="English Language" className="w-36 h-auto mb-3 -ml-1 sm:ml-0" />
						<h4 className="text-lg md:text-xl font-bold text-slate-700">English</h4>
						<p className="text-slate-500">Explore comprehensive courses in English, perfect for all levels from beginner to advanced learners.</p>
					</div>
					<div className="w-full md:w-1/3 p-4">
						<img src="src/assets/images/language-spanish.png" alt="Spanish Language" className="w-44 h-auto -mb-3 scale-105 -ml-5" />
						<h4 className="text-lg md:text-xl font-bold text-slate-700">Spanish</h4>
						<p className="text-slate-500">Dive into the rich and diverse world of Spanish, suitable for enthusiastic learners and cultural explorers.</p>
					</div>
					<div className="w-full md:w-1/3 p-4">
						<img src="src/assets/images/language-german.png" alt="German Language" className="w-36 h-auto mb-3 pt-3" />
						<h4 className="text-lg md:text-xl font-bold text-slate-700">German</h4>
						<p className="text-slate-500">Master the German language, from its intricate grammar to its unique expressions, tailored for all proficiency levels.</p>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section id="testimonials" className="bg-gray-100 p-10 md:p-20">
				<h3 className="text-2xl md:text-3xl font-bold text-center">What Our Users Say</h3>
				<div className="block md:hidden">
					<TestimonialCarousel testimonials={testimonials} />
				</div>
				<div className="table-column md:flex flex-wrap justify-center items-center">
					{testimonials.map((testimonial, index) => (
						<TestimonialCard key={index} {...testimonial} />
					))}
				</div>
			</section>

			{/* Contact Form Section */}
			<section id="contact" className="p-10 md:p-20">
				<h3 className="text-4xl md:text-5xl font-bold text-center text-slate-700">Contact Us</h3>
				<form onSubmit={handleSubmit(submitForm)} className="max-w-lg mx-auto mt-8">
					<div className="mb-4">
						<label htmlFor="name" className="block text-sm font-semibold text-gray-700">
							Name
						</label>
						<input type="text" id="name" name="name" value={values.name} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
						{errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
					</div>
					<div className="mb-4">
						<label htmlFor="email" className="block text-sm font-semibold text-gray-700">
							Email
						</label>
						<input type="email" id="email" name="email" value={values.email} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
						{errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
					</div>
					<div className="mb-4">
						<label htmlFor="message" className="block text-sm font-semibold text-gray-700">
							Message
						</label>
						<textarea id="message" name="message" value={values.message} onChange={handleChange} rows={4} className="mt-1 p-2 w-full border rounded-md"></textarea>
						{errors.message && <span className="text-red-500 text-xs">{errors.message}</span>}
					</div>
					<button type="submit" disabled={isSubmitting} className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
						Send Message
					</button>
				</form>
			</section>

			{/* Footer Section */}
			<footer className="bg-gray-200 p-6 text-center">
				<p className="text-sm md:text-base">&copy; 2023 Lenguan. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default LandingPage;
