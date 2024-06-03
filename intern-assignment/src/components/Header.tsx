import React from "react";

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  // Function to get the current date in the format "Thursday, February 15"
  const getCurrentDate = () => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    const currentDate = new Date().toLocaleDateString("en-US", dateOptions);
    return currentDate;
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800">
      <h1 className="text-xl">Hello, {userName}</h1>
      <p>{getCurrentDate()}</p>
    </header>
  );
};

export default Header;
