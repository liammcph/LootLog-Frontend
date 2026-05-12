import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { signOut } from "../../services/userService";

import { Link } from "react-router";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = async () => {
    localStorage.removeItem("token");
      setUser(null);
    }
  };
  return (
    <nav>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/">Welcome Back {user.username}</Link>
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
