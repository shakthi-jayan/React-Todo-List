import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4">
      <Link className="navbar-brand fw-semibold" to="/tasks">TaskApp</Link>
      <div className="ms-auto">
        {token ? (
          <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link className="btn btn-outline-secondary btn-sm me-2" to="/login">Login</Link>
            <Link className="btn btn-dark btn-sm" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;