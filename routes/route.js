const express = require("express");
const router = express.Router();
const { getUsers, createUser,updateUser, deleteUser, getUser} = require("../controller/User");
const { verifyToken } = require("../middleware/VerifyToken");

router.get("/user", verifyToken, getUsers);
router.post("/user", createUser);
router.get("/user/:id", verifyToken, getUser);
router.put("/user/:id", verifyToken, updateUser);
router.delete("/user:id", verifyToken, deleteUser);

module.exports = router;
