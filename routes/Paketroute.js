const express = require("express");
const router = express.Router();
const { getPaket, createPaket, updatePaket, deletePaket, getPaketById, update_status } = require("../controller/Paket");
const { verifyToken } = require("../middleware/VerifyToken");
const { route } = require("./route");

router.get("/paket", verifyToken, getPaket);
router.get("/paket/:id", verifyToken, getPaketById);
router.post("/paket", verifyToken, createPaket);
router.put("/paket/:id", verifyToken, updatePaket);
router.delete("/paket/:id", verifyToken, deletePaket);
router.get("/paket/status/:id", verifyToken, update_status); 

module.exports = router;