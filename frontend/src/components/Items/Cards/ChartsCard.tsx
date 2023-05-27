import React, { useRef, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const VocabularyChartCard: React.FC = () => {
	const [activeTab, setActiveTab] = useState<number>(0);

	// TODO: Consider making a chart for mistakes made
	// Sample data for the line chart
	const chartData1: ChartData<"line"> = {
		labels: ["JUN-01", "JUN-02", "JUN-03", "JUN-04", "JUN-05", "JUN-06", "JUN-07"],
		datasets: [
			{
				label: "Number of words learned",
				data: [2, 5, 7, 10, 15, 20, 25],
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 1,
			},
		],
	};

	const chartData2: ChartData<"line"> = {
		labels: ["MAY-28", "MAY-29", "JAN-01", "JAN-03", "JAN-04", "JAN-06", "JAN-07"],
		datasets: [
			{
				label: "Number of points earned",
				data: [13, 33, 48, 12, 10, 20, 34],
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				borderColor: "rgba(54, 162, 235, 1)",
				borderWidth: 1,
			},
		],
	};

	// Chart options
	const chartOptions1: ChartOptions<"line"> = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Words Learned",
			},
		},
	};

	const chartOptions2: ChartOptions<"line"> = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Points Earned Last 10 Days played",
			},
		},
	};

	return (
		<div className="col-span-1 md:col-span-2 h-fit bg-backgroundalt p-6 rounded-xl drop-shadow-xl">
			<h3 className="text-2xl font-bold mb-4">Progress</h3>
			<div className="tabs">
				<ul className="flex">
					<li className={`-mb-px mr-1 ${activeTab === 0 ? "border-primary-500 border-b-2" : "border-secondary-200"}`}>
						<a className={`bg-backgroundalt inline-block cursor-pointer py-2 px-4 font-semibold ${activeTab === 0 ? "text-primary-500" : "text-secondary-500"} hover:text-primary-600`} onClick={() => setActiveTab(0)}>
							Vocabulary
						</a>
					</li>
					<li className={`-mb-px mr-1 ${activeTab === 1 ? "border-primary-500 border-b-2" : "border-secondary-200"}`}>
						<a className={`bg-backgroundalt inline-block cursor-pointer py-2 px-4 font-semibold ${activeTab === 1 ? "text-primary-500" : "text-secondary-500"} hover:text-primary-600`} onClick={() => setActiveTab(1)}>
							Gender Duel
						</a>
					</li>
				</ul>
			</div>
			<div className="tab-content">
				<div className={`tab-item ${activeTab === 0 ? "block" : "hidden"}`}>
					<Line data={chartData1} options={chartOptions1} />
				</div>
				<div className={`tab-item ${activeTab === 1 ? "block" : "hidden"}`}>
					<Line data={chartData2} options={chartOptions2} />
				</div>
			</div>
		</div>
	);
};

export default VocabularyChartCard;
