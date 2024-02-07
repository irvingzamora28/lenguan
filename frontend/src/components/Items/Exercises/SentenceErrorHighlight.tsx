import React from "react";

interface SentenceErrorHighlightProps {
	userInput: string;
	correctText: string;
}

const SentenceErrorHighlight: React.FC<SentenceErrorHighlightProps> = ({ userInput, correctText }) => {
	const findFirstErrorIndex = (input: string, correct: string) => {
		if (input === correct.slice(0, -1)) {
			return input.length;
		}

		for (let idx = 0; idx < input.length; idx++) {
			if (idx >= correct.length || input[idx] !== correct[idx]) {
				return idx;
			}
		}
		return null;
	};

	const findErrorWordIndexes = (input: string, correct: string, errorIdx: number) => {
		// Check if error is just the missing period at the end
		if (errorIdx === input.length && correct[errorIdx] === ".") {
			return [errorIdx, errorIdx + 1];
		}

		let start = input.slice(0, errorIdx).lastIndexOf(" ") + 1;
		let end = correct.indexOf(" ", start);
		end = end === -1 ? correct.length : end;
		return [start, end];
	};

	const errorIndex = findFirstErrorIndex(userInput, correctText);
	const errorWordIndices = errorIndex !== null ? findErrorWordIndexes(userInput, correctText, errorIndex) : null;

	if (errorIndex === null) {
		return <span>{correctText}</span>;
	}

	let start = errorWordIndices ? errorWordIndices[0] : errorIndex;
	let end = errorWordIndices ? errorWordIndices[1] : errorIndex + 1;
	const beforeError = correctText.slice(0, start);
	const errorPart = correctText.slice(start, end);
	const afterError = correctText.slice(end);

	return (
		<span>
			{beforeError}
			<span className="bg-red-100 border border-red-200 text-red-800">{errorPart}</span>
			{afterError}
		</span>
	);
};

export default SentenceErrorHighlight;
