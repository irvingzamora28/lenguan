import React from "react";
import Markdown from "markdown-to-jsx";
import TextToSpeechPlayer from "../Misc/TextToSpeechPlayer";
import TipBox from "./TipBox";
import Mnemonic from "./Mnemonic";

interface LessonProps {
	content: string;
}

const Lesson: React.FC<LessonProps> = ({ content }) => {
	return (
		<div>
			<Markdown
				options={{
					overrides: {
						h1: {
							props: {
								className: "py-3 text-2xl md:text-3xl lg:text-4xl",
							},
						},
						h2: {
							props: {
								className: "py-3 text-xl md:text-2xl lg:text-3xl",
							},
						},
						h3: {
							props: {
								className: "py-3 text-md md:text-md lg:text-2xl",
							},
						},
						ul: {
							props: {
								className: "pl-5 py-3 list-disc",
							},
						},
						ol: {
							props: {
								className: "pl-5 py-3 list-decimal",
							},
						},
						li: {
							props: {
								className: "pl-2 py-3",
							},
						},
						table: {
							props: {
								className: "table-auto w-full text-center",
							},
						},
						thead: {
							props: {
								className: "border-b font-medium dark:border-neutral-500",
							},
						},
						tr: {
							props: {
								className: "border-b dark:border-neutral-500",
							},
						},
						p: {
							props: {
								className: "py-3",
							},
						},
						TextToSpeechPlayer: {
							component: TextToSpeechPlayer,
						},
						TipBox: {
							component: TipBox,
						},
						Mnemonic: {
							component: Mnemonic,
						},
						blockquote: {
							props: {
								className: "text-md italic font-normal text-gray-500 dark:text-white",
							},
						},
					},
				}}
			>
				{content}
			</Markdown>
		</div>
	);
};

export default Lesson;
