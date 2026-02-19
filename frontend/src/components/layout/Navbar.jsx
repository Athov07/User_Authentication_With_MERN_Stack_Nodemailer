import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";


const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

const handleLogout = async () => {
  const res = await logoutUser();

  if (!res.error) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/");
  } else {
    console.log(res.error);
  }
};


  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">MyApp</h1>

        <div className="space-x-6">
          {token ? (
            <>
              <Link to="/home" className="hover:text-primary transition">
                Home
              </Link>

              <button
                onClick={handleLogout}
                className="hover:text-primary transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-primary transition">
                Login
              </Link>

              <Link to="/register" className="hover:text-primary transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
