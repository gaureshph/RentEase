const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Renter = require("../models/Renter");
const Lister = require("../models/Lister");

router.post("/signup", async (req, res) => {
  try {
    console.log("Received signup request:", req.body);
    const { username, email, password, role } = req.body;
    // Enhanced input validation logging
    if (!username || !email || !password || !role) {
      console.log("Missing required fields:", {
        username: !!username,
        email: !!email,
        password: !!password,
        role: !!role,
      });
      return res.status(400).json({ message: "All fields are required" });
    }

    // Email validation with detailed logging
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email format:", email);
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check for existing user with detailed logging
    let existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      let userId = existingUser._id;

      let existingRenter = await Renter.findOne({ user_id: userId });
      let existingLister = await Lister.findOne({ user_id: userId });

      if (role.toLowerCase() === "lister" && existingLister) {
        console.log("User already registered as lister:", {
          existingEmail: existingUser.email === email,
          existingUsername: existingUser.username === username,
        });
        return res.status(400).json({
          message: "User already registered as lister",
        });
      }

      if (role.toLowerCase() === "renter" && existingRenter) {
        console.log("User already registered as renter:", {
          existingEmail: existingUser.email === email,
          existingUsername: existingUser.username === username,
        });
        return res.status(400).json({
          message: "User already registered as renter",
        });
      }
    }

    // Password hashing with error catching
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let userId;
    if (!existingUser) {
      // Create new user with logging
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });
      await user.save();
      userId = user._id;
    } else {
      userId = existingUser._id;
    }

    if (role.toLowerCase() === "lister") {
      const lister = new Lister({
        user_id: userId,
      });
      await lister.save();
    }

    if (role.toLowerCase() === "renter") {
      const renter = new Renter({
        user_id: userId,
      });
      await renter.save();
    }

    console.log("User saved successfully:", {
      userId: userId,
      username: username,
    });

    // Create token
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      token,
      user: {
        id: userId,
        username: username,
        email: email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Registration failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/addrole", async (req, res) => {
  try {
    console.log("Received add role request:", req.body);
    const { userId, role } = req.body;
    // Enhanced input validation logging
    if (!userId || !role) {
      console.log("Missing required fields:", {
        userId: !!userId,
        role: !!role,
      });
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing user with detailed logging
    let user = await User.findOne({
      _id: userId,
    });
    if (user) {
      if (role.toLowerCase() === "lister") {
        let existingLister = await Lister.findOne({ user_id: userId });
        if (!existingLister) {
          const lister = new Lister({
            user_id: userId,
          });
          await lister.save();
        }
      }

      if (role.toLowerCase() === "renter") {
        let existingRenter = await Renter.findOne({ user_id: userId });
        if (!existingRenter) {
          const renter = new Renter({
            user_id: userId,
          });
          await renter.save();
        }
      }

      console.log("Role added successfully:", {
        userId: userId,
        role: role,
      });
    }
    res.status(201).json();
  } catch (error) {
    console.error("Role add failed:", error);
    res.status(500).json({
      message: "Role add failed:",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

module.exports = router;
