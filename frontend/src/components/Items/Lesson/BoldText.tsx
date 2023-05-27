import React from "react";

interface BoldTextProps {
    children: React.ReactNode;
}

const BoldText: React.FC<BoldTextProps> = ({ children }) => {
    return (
        <div className="text-accent-500">{children}</div>
    );
};

export default BoldText;
