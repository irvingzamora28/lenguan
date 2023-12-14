import { FaTimes } from "react-icons/fa";

type ModalProps = {
	show: boolean;
	onClose: () => void;
	title?: string;
	icon?: React.ReactNode;
	color?: string;
	children: React.ReactNode;
	onClickOutside?: () => void;
};

const ModalSimple: React.FC<ModalProps> = ({ show, onClose, title, icon, color, children, onClickOutside }) => {
	if (!show) {
		return null;
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto" onClick={onClickOutside}>
			<div className="bg-white rounded-lg shadow-2xl w-3/4 lg:max-w-4xl m-4 animate-modal-scale-up" role="dialog" aria-modal="true" aria-labelledby="modal-headline" onClick={(e) => e.stopPropagation()}>
				<div className="flex justify-between items-center bg-gray-100 text-gray-800 p-3 rounded-t-lg">
					<h2 className="text-2xl font-bold flex items-center">
						{icon && <span className="mr-2">{icon}</span>}
						{title}
					</h2>
					<button onClick={onClose} className="text-gray-500 hover:text-gray-700">
						<FaTimes />
					</button>
				</div>
				<div className="modal-body p-4">
					<div className="mt-4">{children}</div>
					<div className="flex justify-center mt-4">
						<button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalSimple;
