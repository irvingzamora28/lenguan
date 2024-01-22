import React from "react";
import Markdown from "markdown-to-jsx";
import TextToSpeechPlayer from "../Misc/TextToSpeechPlayer";
import TipBox from "./TipBox";
import Mnemonic from "./Mnemonic";
import Table from "./Table";
import TableBody from "./TableBody";

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
							component: Table,
							props: {
								className: "min-w-full text-left border-collapse bg-gradient-to-b from-blue-500 to-blue-600 dark:from-blue-800 dark:to-blue-900 rounded-none md:rounded-lg",
							},
						},
						thead: {
							props: {
								className: "border-b font-medium dark:border-neutral-500",
							},
						},
						th: {
							props: {
								className: "px-4 py-2 font-semibold text-sm sm:text-base text-slate-50 dark:text-gray-200",
							},
						},
						tbody: {
							component: TableBody,
							props: {
								className: "bg-white dark:bg-neutral-800 dark:text-gray-200",
							},
						},
						td: {
							props: {
								className: "px-4 py-2 border-b dark:border-neutral-100",
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
