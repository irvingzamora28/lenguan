import { ErrorBannerProps } from "../../types/props";

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message }) => {
	if (!message) return null;

	return (
		<div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md mb-4">
			<p>{message}</p>
		</div>
	);
};
