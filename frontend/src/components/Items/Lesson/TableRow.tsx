import React from "react";
import { ReactNode } from "react";

interface TableRowProps {
	children: ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({ children }) => {
	return <tr className="hover:bg-gray-300 dark:hover:bg-neutral-700 even:bg-gray-100 odd:bg-white">{children}</tr>;
};

export default TableRow;
