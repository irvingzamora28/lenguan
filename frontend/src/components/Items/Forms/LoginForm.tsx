import React from "react";

interface LoginFormProps {
	onLogin: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	errorMessages?: string[];
	onLoginAsGuest: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onChange, errorMessages, onLoginAsGuest }) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<>
			<div className="relative py-3 mx-auto max-w-xs sm:max-w-xl md:max-w-2xl">
				<div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-light-blue-500 shadow-lg transform -rotate-6 rounded-3xl sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
				<div className="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20">
					<div className="mx-auto">
						<div>
							<h1 className="text-xl font-semibold text-gray-600 sm:text-2xl">Login</h1>
						</div>
						<div className="divide-y divide-gray-200">
							<form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
								<input type="hidden" name="remember" value="true" />
								<div className="space-y-3">
									<div>
										<label htmlFor="email-address" className="sr-only">
											Email address
										</label>
										<input
											id="email-address"
											name="email"
											type="email"
											autoComplete="email"
											required
											className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
											placeholder="Email address"
											onChange={onChange}
										/>
									</div>
									<div>
										<label htmlFor="password" className="sr-only">
											Password
										</label>
										<input
											id="password"
											name="password"
											type="password"
											autoComplete="current-password"
											required
											className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
											placeholder="Password"
											onChange={onChange}
										/>
									</div>
								</div>
								{errorMessages && (
									<div className="text-sm text-red-600">
										{errorMessages.map((line, index) => (
											<p key={index}>{line}</p>
										))}
									</div>
								)}
								<div className="flex items-center justify-between">
									<div className="text-sm">
										<a href="#" className="font-medium text-primary-600 hover:text-primary-500">
											Forgot your password?
										</a>
									</div>
								</div>
								<div>
									<button
										type="submit"
										onClick={onLogin}
										className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
									>
										Log in
									</button>
								</div>
							</form>
							<button onClick={onLoginAsGuest} className="mt-6 w-full bg-accent-400 hover:bg-accent-500 text-white font-bold py-2 px-4 rounded-full">
								Continue as Guest
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
