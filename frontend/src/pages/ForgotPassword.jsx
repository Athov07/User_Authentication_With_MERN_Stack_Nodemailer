import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!email.trim()) {
      setError("Email is required");
      return;
    } else if (!email.includes("@")) {
      setError("Email must contain @");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });

      setSuccess(res.data.message);

      // Redirect to Reset Password page after 2 sec
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto card">
      <h1 className="title-lg mb-6">Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter your email"
        className="input-field mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="btn-primary w-full mb-4" onClick={handleSubmit}>
        Send OTP
      </button>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}
    </div>
  );
};

export default ForgotPassword;
