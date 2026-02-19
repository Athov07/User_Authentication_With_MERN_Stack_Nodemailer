import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP, resendOTP } from "../services/authService";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp) {
      setServerMessage("Please enter OTP");
      return;
    }

    const res = await verifyOTP({ email, otp });

    if (res.error) {
      setServerMessage(res.error);
    } else {
      setServerMessage(res.message);

      //Save token & redirect to home or login
      localStorage.setItem("accessToken", res.token);
      navigate("/");
    }
  };

  const handleResend = async () => {
    const res = await resendOTP({ email });

    if (res.error) setServerMessage(res.error);
    else setServerMessage(res.message);
  };

  return (
    <div className="max-w-md mx-auto card">
      <h1 className="title-lg mb-6">Verify OTP</h1>
      <p className="text-muted mb-4">OTP sent to {email}</p>

      <input
        type="text"
        placeholder="Enter OTP"
        className="input-field mb-4"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button className="btn-primary w-full mb-2" onClick={handleVerify}>
        Verify OTP
      </button>

      <button className="btn-danger w-full" onClick={handleResend}>
        Resend OTP
      </button>

      {serverMessage && <p className="mt-4 text-center text-red-600">{serverMessage}</p>}
    </div>
  );
};

export default VerifyOTP;
