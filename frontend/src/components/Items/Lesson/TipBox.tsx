import React from "react";
import { ReactNode } from "react";

interface TipBoxProps {
	children: ReactNode;
}

const TipBox: React.FC<TipBoxProps> = ({ children }) => {
	return (
		<div className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md" role="alert">
			<div className="flex">
				<div className="py-1">
					<svg className="fill-current h-6 w-6 text-blue-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
						<path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-9a1 1 0 00-1 1v3a1 1 0 002 0V7a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z" />
					</svg>
				</div>
				<div>
					💡 <b>Pro Tip: </b>
					{children}
				</div>
			</div>
		</div>
	);
};

export default TipBox;
