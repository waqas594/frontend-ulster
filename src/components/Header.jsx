import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // Get user role from localStorage

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    localStorage.removeItem("role"); // Clear role
    navigate("/"); // Redirect to login page
  };

  const isAuthPage =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <header className="bg-gray-900 text-white shadow">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            Ulster Videos
          </Link>
        </div>

        {!isAuthPage && token && (
          <ul className="flex space-x-6">
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
              >
                Logout
              </button>
            </li>

            {role === "creator" && (
              <li>
                <Link
                  to="/videos/upload"
                  className="text-white hover:text-gray-300"
                >
                  Upload Video
                </Link>
              </li>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
