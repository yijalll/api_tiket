const express = require("express");
const router = express.Router();
const {getMobil, createMobil, updateMobil, deleteMobil, getMobilById} = require ("../controller/Mobil");
const { verifyToken } = require("../middleware/VerifyToken");

router.get("/mobil", verifyToken, getMobil);
router.get("/mobil/:id", verifyToken, getMobilById);
router.post("/mobil", verifyToken, createMobil);
router.put("/mobil/:id", verifyToken, updateMobil);
router.delete("/mobil/:id", verifyToken, deleteMobil);

module.exports = router;