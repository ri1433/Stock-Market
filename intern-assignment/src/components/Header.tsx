import React from "react";
import "./Header.css";

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  const currentDate = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header-content">
        <h1>Hello, {userName}</h1>
        <p>{currentDate}</p>
      </div>
    </header>
  );
};

export default Header;
