import React from "react";

interface BoldTextProps {
    children: React.ReactNode;
}

const BoldText: React.FC<BoldTextProps> = ({ children }) => {
    return (
        <div className="text-red-500">{children}</div>
    );
};

export default BoldText;
