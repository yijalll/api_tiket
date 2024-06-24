const express = require("express");
const router = express.Router();
const { RefreshToken } = require("../controller/RefreshToken");
const { Register, Login, Logout } = require("../controller/Auth");
const { verify } = require("jsonwebtoken");
const { verifyToken } = require("../middleware/VerifyToken");

router.post("/login", Login);
router.get("/token", RefreshToken);
router.delete("/logout", verifyToken, Logout);

module.exports = router;
