import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import { useToggleTheme } from "../../hooks/useToggleTheme";
import { Moon, Sun } from "lucide-react"; 
import navLinks from "./navLinks.json";

const Header: React.FC = () => {
  const { formState } = useGlobalContext();
  const profileName = `${formState.firstName} ${formState.lastName}`;
  const { isDarkMode, toggleTheme } = useToggleTheme();

  return (
    <header className="bg-bg text-text shadow-md py-4 px-8 flex justify-between items-center">
      <h1 className="text-lg font-semibold">{profileName || "Welcome"}</h1>

      <div className="flex items-center space-x-6">
        <nav>
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-primary hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button onClick={toggleTheme}>
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" /> 
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
