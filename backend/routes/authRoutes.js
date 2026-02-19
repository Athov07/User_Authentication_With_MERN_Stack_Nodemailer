const User = require("../models/User");
const express = require("express");
const router = express.Router();
const { registerUser,  
        verifyOTP, 
        loginUser, 
        resendOTP,
        refreshAccessToken,
        forgotPassword,
        resetPassword,
        logoutUser
    } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/login", loginUser);
router.post("/logout", logoutUser);


router.get("/profile", protect, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

router.post("/resend-otp", resendOTP);
router.post("/refresh-token", refreshAccessToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/logout", logoutUser);





module.exports = router;

