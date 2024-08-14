const express = require("express");
const router = express.Router();
const { getJurusan, createJurusan, updateJurusan, deleteJurusan, getJurusanAktif, getJurusanById, changeStatus} = require("../controller/Jurusan");
const { verifyToken } = require("../middleware/VerifyToken");

router.get("/jurusan", verifyToken, getJurusan);
router.get("/jurusan/aktif", verifyToken, getJurusanAktif);
router.get("/jurusan/:id", verifyToken,  getJurusanById);
router.post("/jurusan", verifyToken, createJurusan);
router.put("/jurusan/:id", verifyToken, updateJurusan);
router.delete("/jurusan/:id", verifyToken, deleteJurusan);
router.patch('/jurusan/change/:id', verifyToken, changeStatus);

module.exports = router;