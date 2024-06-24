const express = require("express");
const router = express.Router();
const {getKota, createKota,updateKota, deleteKota, getKotaById } = require ("../controller/Kota");
const { verifyToken } = require("../middleware/VerifyToken");

router.get("/kota",  verifyToken, getKota);
router.get("/kota/:id", verifyToken,  getKotaById);
router.post("/kota", verifyToken, createKota);
router.put("/kota/:id", verifyToken, updateKota);
router.delete("/kota/:id", verifyToken, deleteKota);


module.exports = router;