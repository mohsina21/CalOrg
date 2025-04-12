import React from "react";

const Header = ({ toggleTheme, dark }) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-semibold">CalOrg</h1>
      <button
        onClick={toggleTheme}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
      >
        {dark ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
