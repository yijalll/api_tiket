const express = require("express");
const router = express.Router();
const{getTransaksi, createTransaksi, updateTransaksi, deleteTransaksi, getTransaksiById, getTransaksiAdmin, getTransaksiTiket} = require ("../controller/Transaksi");
const { verifyToken } = require("../middleware/VerifyToken");
const { multerValidation, uploadGcs } = require("../helper/gcsUpload");

router.get("/transaksi/admin",verifyToken, getTransaksiAdmin);
router.get("/transaksi/tiket/:id",verifyToken, getTransaksiTiket);
router.get("/transaksi/me",verifyToken, getTransaksi);
router.get("/transaksi", verifyToken, getTransaksi);
router.get("/transaksi/:id",verifyToken, getTransaksiById);
router.post("/transaksi", verifyToken, multerValidation, uploadGcs, createTransaksi);
router.put("/transaksi/:id", verifyToken, multerValidation, uploadGcs, updateTransaksi);
router.delete("/transaksi/:id",verifyToken, deleteTransaksi); 


module.exports = router; 