import React, { useEffect, useRef } from "react";

type ModalProps = {
	show: boolean;
	onClose: () => void;
	title?: string;
	icon?: React.ReactNode;
	color?: string;
	children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ show, onClose, title, icon, color = "bg-green-500", children }) => {
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (show) {
			// Add focus after 500ms so the modal doesn't close accidenally on open if a user presses Enter
			setTimeout(() => {
				closeButtonRef.current?.focus();
			}, 500);
		}
	}, [show]);

	if (!show) {
		return null;
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center px-4 py-6 z-50">
			<div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-lg w-full">
				<div className={`${color} p-6 flex flex-col items-center`}>
					{icon}
					{title && <h2 className="mt-4 text-xl font-bold text-white">{title}</h2>}
				</div>
				<div className="p-6 text-center">{children}</div>
				<div className="bg-gray-100 px-6 py-3 flex justify-center">
					<button ref={closeButtonRef} onClick={onClose} className="bg-rose-500 text-white font-bold py-2 px-4 rounded hover:bg-rose-600 transition duration-300 ease-in-out">
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
