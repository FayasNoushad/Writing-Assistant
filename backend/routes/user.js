const express = require("express");
const {
  register,
  login,
  authenticateToken,
} = require("../helpers/user-helpers");
const router = express.Router();

router.post("/register", async (req, res) => {
  const registerData = await register(req.body);
  if (registerData.success) {
    res.status(201).json(registerData);
  } else {
    res.status(401).json(registerData);
  }
});

router.post("/login", async (req, res) => {
  const loginData = await login(req.body);
  if (loginData.success) {
    res.json(loginData);
  } else {
    res.status(401).json(loginData);
  }
});

router.get("/check/", authenticateToken, async (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
