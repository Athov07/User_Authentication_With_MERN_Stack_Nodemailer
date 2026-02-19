import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Frontend validation
  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!formData.email.includes("@"))
      newErrors.email = "Email must contain @";

    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await loginUser(formData);

    if (res.error) {
      setServerMessage(res.error);
    } else {
      // Save tokens
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);

      setServerMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/home"); // Redirect to Home
      }, 1000);
    }
  };

  return (
    <div className="max-w-md mx-auto card">
      <h1 className="title-lg mb-6">Login</h1>

      {/* Email */}
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-field"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-danger text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="mb-6">
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-field"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="text-danger text-sm mt-1">{errors.password}</p>}
      </div>

      {/* Login button */}
      <button className="btn-primary w-full mb-4" onClick={handleLogin}>
        Login
      </button>

      {/* Forgot Password link */}
      <div className="text-center mb-2 text-sm text-gray-600">
        <Link to="/forgot-password" className="text-primary hover:underline">
          Forgot Password?
        </Link>
      </div>

      {/* Register link */}
      <div className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary hover:underline">
          Create Account
        </Link>
      </div>

      {/* Server message */}
      {serverMessage && (
        <p className="mt-4 text-center text-red-600">{serverMessage}</p>
      )}
    </div>
  );
};

export default Login;
