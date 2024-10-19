import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const Header: React.FC = () => {
  const { formState } = useGlobalContext();
  const profileName = `${formState.firstName} ${formState.lastName}`;
  return (
    <header>
      {profileName}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/profile-form">Profile Form</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
