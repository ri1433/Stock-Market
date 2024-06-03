import React from "react";

interface NavBarProps {
  isOpen: boolean;
  setNavOpen: (isOpen: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ isOpen, setNavOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}>
      <button
        className="p-4 focus:outline-none"
        onClick={() => setNavOpen(!isOpen)}>
        {isOpen ? "⬅️" : "➡️"}
      </button>
      <div className="flex flex-col items-center mt-8">
        <button className="mb-4 text-xl">🏠</button>
        <button className="mb-4 text-xl">📊</button>
        <button className="mb-4 text-xl">💼</button>
        <button className="mb-4 text-xl">⚙️</button>
      </div>
    </div>
  );
};

export default NavBar;
