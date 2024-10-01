const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const crypto = require("crypto"); // For generating a verification token
const sendEmail = require("../utils/sendEmail");

// Route to handle user signup
router.post("/signup", async (req, res) => {
  const { name, surname, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      name,
      surname,
      email,
      password: hashedPassword,
    });

    // Generate email verification token
    const token = crypto.randomBytes(20).toString("hex");
    user.verificationToken = token;
    user.verificationTokenExpiry = Date.now() + 3600000; // 1 hour from now

    await user.save();

    const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;
    const message = `Please verify your email by clicking the link: ${verifyUrl}`;
    await sendEmail(user.email, "Email Verification", message);

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    const uniqueToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      msg: "Signup successful! Please check your email to verify your account.",
      uniqueToken: uniqueToken,
    });

    // res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Route to handle email verification
router.get("/verify-email/:token", async (req, res) => {
  const token = req.params.token;

  try {
    // Find user by verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid token: : Email already verified" });
    }

    // Mark user as verified
    user.verified = true;
    user.verificationToken = undefined; // Clear the token
    await user.save();

    res.json({ msg: "Email verified successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Route to resend verification email
router.post("/resend-verification-email", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.verified) {
      return res
        .status(400)
        .json({ msg: "Invalid request: email already verified" });
    }

    const token = crypto.randomBytes(20).toString("hex");
    user.verificationToken = token;
    user.verificationTokenExpiry = Date.now() + 3600000; // 1 hour from now

    await user.save();

    const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;
    const message = `Please verify your email by clicking the link: ${verifyUrl}`;
    await sendEmail(user.email, "Resend Email Verification", message);

    res.json({ msg: "Verification email resent successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Check if the user is verified
router.post("/check-verified", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ isVerified: user.verified });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Route to handle user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password is incorrect" });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Route to handle forgot password (send email)
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "No user found with that email" });
    }

    // Generate password reset token
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpiry = Date.now() + 3600000; // 1 hour

    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    const message = `You requested a password reset. Click here to reset your password: ${resetUrl}`;

    await sendEmail(user.email, "Password Reset", message);

    res.json({ msg: "Reset password email sent successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Route to handle resetting the password
router.post("/reset-password/:token", async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Clear the reset token and expiry
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();

    res.json({ msg: "Password reset successful!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
