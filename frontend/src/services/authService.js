import axios from "axios";

// Base URL of your backend
const API_URL = "http://localhost:5000/api/auth";

// Register user
export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/register`, userData);
    return res.data;
  } catch (error) {
    // Return backend error message
    return { error: error.response?.data?.message || error.message };
  }
};

// Verify OTP
export const verifyOTP = async (otpData) => {
  try {
    const res = await axios.post(`${API_URL}/verify-otp`, otpData);
    return res.data;
  } catch (error) {
    return { error: error.response?.data?.message || error.message };
  }
};

// Login user
export const loginUser = async (loginData) => {
  try {
    const res = await axios.post(`${API_URL}/login`, loginData);
    return res.data;
  } catch (error) {
    return { error: error.response?.data?.message || error.message };
  }
};

// Resend OTP
export const resendOTP = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/resend-otp`, data);
    return res.data;
  } catch (error) {
    return { error: error.response?.data?.message || error.message };
  }
};

// User Logout 
export const logoutUser = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");

    console.log("RefreshToken:", refreshToken);
    console.log("AccessToken:", accessToken);

    const res = await axios.post(
      `${API_URL}/logout`,
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Response:", res);
    return res.data;

  } catch (error) {
    console.log("FULL ERROR OBJECT:", error);
    console.log("ERROR RESPONSE:", error.response);
    console.log("ERROR MESSAGE:", error.message);

    return {
      error: "Logout failed",
    };
  }
};


