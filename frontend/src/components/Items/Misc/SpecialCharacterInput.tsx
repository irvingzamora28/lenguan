interface SpecialCharacterInputProps {
	specialCharacters: string[];
	inputValue: string;
	setInputValue: (value: string) => void;
	inputRef: React.RefObject<HTMLInputElement>;
}

const SpecialCharacterInput: React.FC<SpecialCharacterInputProps> = ({ specialCharacters, inputValue, setInputValue, inputRef }) => {
	const handleSpecialCharacterInput = (character: string) => {
		if (inputRef.current) {
			const cursorPosition = inputRef.current.selectionStart ?? 0;
			const textBeforeCursor = inputValue.slice(0, cursorPosition);
			const textAfterCursor = inputValue.slice(cursorPosition);

			const updatedInputValue = textBeforeCursor + character + textAfterCursor;
			setInputValue(updatedInputValue);

			// Setting a timeout to ensure the cursor position is updated after state change
			setTimeout(() => {
				if (inputRef.current) {
					inputRef.current.focus();
					const newCursorPosition = cursorPosition + character.length;
					inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
				}
			}, 10);
		}
	};

	return (
		<div>
			{/* Title saying Special characters */}
			<h2 className="text-md font-semibold mb-4">Special Characters</h2>
			<div className="flex flex-wrap gap-2 mt-2 justify-start md:justify-center">
				{specialCharacters.map((char, index) => (
					<button key={index} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded text-lg md:text-base lg:text-lg w-14 h-14 md:w-12 md:h-12" onClick={() => handleSpecialCharacterInput(char)}>
						{char}
					</button>
				))}
			</div>
		</div>
	);
};

export default SpecialCharacterInput;
