import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!formData.email.includes("@")) newErrors.email = "Email must contain @";
    if (!formData.password) newErrors.password = "Password required";
    else if (!/^(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password))
      newErrors.password = "Password must be alphanumeric";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (res.error) {
      setServerMessage(res.error);
    } else {
      setServerMessage(res.message);

      // Redirect to Verify OTP page
      navigate("/verify-otp", { state: { email: formData.email } });
    }
  };

  return (
    <div className="max-w-md mx-auto card">
      <h1 className="title-lg mb-6">Register</h1>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="input-field mb-4"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <p className="text-danger text-sm">{errors.name}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="input-field mb-4"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p className="text-danger text-sm">{errors.email}</p>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="input-field mb-4"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p className="text-danger text-sm">{errors.password}</p>}

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="input-field mb-6"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      {errors.confirmPassword && <p className="text-danger text-sm">{errors.confirmPassword}</p>}

      <button className="btn-primary w-full mb-4" onClick={handleRegister}>
        Register
      </button>

      {serverMessage && <p className="mt-4 text-center text-red-600">{serverMessage}</p>}
    </div>
  );
};

export default Register;
