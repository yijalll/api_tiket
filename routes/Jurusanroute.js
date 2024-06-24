const express = require("express");
const router = express.Router();
const { getJurusan, createJurusan, updateJurusan, deleteJurusan, getJurusanById} = require("../controller/Jurusan");
const { verifyToken } = require("../middleware/VerifyToken");

router.get("/jurusan", verifyToken, getJurusan);
router.get("/jurusan/:id", verifyToken,  getJurusanById);
router.post("/jurusan", verifyToken, createJurusan);
router.put("/jurusan/:id", verifyToken, updateJurusan);
router.delete("/jurusan/:id", verifyToken, deleteJurusan);

module.exports = router;