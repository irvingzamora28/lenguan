import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const NotFoundPage = () => {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		if (error.status === 401) {
			// ...
		} else if (error.status === 404) {
			// ...
		}

		return (
			<div id="error-page">
				<h1>Oops! {error.status}</h1>
				<p>{error.statusText}</p>
				{error.data?.message && (
					<p>
						<i>{error.data.message}</i>
					</p>
				)}
			</div>
		);
	} else if (error instanceof Error) {
		return (
			<div id="error-page">
				<h1>Oops! Unexpected Error</h1>
				<p>Something went wrong.</p>
				<p>
					<i>{error.message}</i>
				</p>
			</div>
		);
	} else {
		return (
			<div className="flex flex-col items-center justify-center h-screen text-gray-600">
				<h1 className="text-6xl font-semibold">404</h1>
				<p className="text-2xl">Oops! Page not found.</p>
				<p className="mt-2">We could not find the page you were looking for.</p>
				<a href="/" className="mt-6 text-blue-600 hover:text-blue-800 hover:underline">
					Go back home
				</a>
			</div>
		);
	}
};

export default NotFoundPage;
