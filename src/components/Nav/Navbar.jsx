import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router";

import "./NavBar.css";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = async () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <nav>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/">Welcome Back {user.username}</Link>
              <Link to="/income">Income</Link>
              <Link to="/expense">Expense</Link>
              <Link to="/goal">Goal</Link>
              <Link to="/" onClick={handleSignOut}>
                Sign Out
              </Link>
            </li>
            {user && (
              <li>
                <div title={user.username}>
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </li>
            )}
          </>
        ) : (
          <>
            <li>
              <Link to="/">Home</Link>
              <Link to="/sign-up">Sign Up</Link>
              <Link to="/sign-in">Sign In</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
