import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-6 text-black ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
