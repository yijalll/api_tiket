const Transaksi = require('../models/TransaksiModel');
const Users = require('../models/UserModel')
const Jurusan = require('../models/JurusanModel')


const getTransaksi = async (req, res) => {
    try {
        const id = req.id
        const transaksi = await Transaksi.findAll({where: {'user_id': id}});

        if (transaksi.length == 0) {
            return res.status(400).json({
                message: 'cant get this transaction',
            });
        } else {
            return res.status(200).json({
                data: transaksi,
                message: "success get all data",
            });
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const getTransaksiById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaksi = await Transaksi.findOne({ where: { id } });

        if (!transaksi) {
            return res.status(404).json({
                message: "Transaksi not found",
            });
        }

        return res.status(200).json({
            data: transaksi,
            message: "success get data",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const createTransaksi = async (req, res) => {
    try {
        const { jurusan_id, nama, telp, jk, ispaid, user_id, alamat, kontak_darurat } = req.body;
        if (!jurusan_id || !nama || !telp || !jk || ispaid === undefined || !user_id || !alamat || !kontak_darurat) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const jurusan = await Jurusan.findOne ({
            where : {
                id : jurusan_id
            }
        })
        if(!jurusan_id) return res.status(404).json ({massage : "jurusan tidak ditemukan"}) 

        const bukti_bayar = "Blank.png";
        const newTransaksi = await Transaksi.create({
            jurusan_id,
            nama,
            telp,
            jk,
            ispaid,
            user_id,
            alamat,
            kontak_darurat,
            bukti_bayar
        });

        const responseData = {
            id: newTransaksi.id,
            jurusan: {
                id: jurusan.id,
                // nama: jurusan.nama
            },
            nama: newTransaksi.nama,
            telp: newTransaksi.telp,
            jk: newTransaksi.jk,
            ispaid: newTransaksi.ispaid,
            user_id: newTransaksi.user_id,
            alamat: newTransaksi.alamat,
            kontak_darurat: newTransaksi.kontak_darurat,
            bukti_bayar: newTransaksi.bukti_bayar,
            createdAt: newTransaksi.createdAt,
            updatedAt: newTransaksi.updatedAt
        };

        return res.status(201).json({
            data: [responseData],
            message: "success post data",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const updateTransaksi = async (req, res) => {
    try {
        const { id } = req.params;
        const { jurusan_id, nama, telp, jk, ispaid, user_id, jumlah_seat, jumlah_bayar, bukti_bayar } = req.body;

        const [updated] = await Transaksi.update(
            { jurusan_id, nama, telp, jk, ispaid, user_id, jumlah_seat, jumlah_bayar, bukti_bayar },
            { where: { id } }
        );

        if (updated === 0) {
            return res.status(404).json({
                message: "Transaksi not found",
            });
        }

        return res.status(200).json({
            message: "success update data",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const deleteTransaksi = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Transaksi.destroy({
            where: { id }
        });

        if (deleted === 0) {
            return res.status(404).json({
                message: "Transaksi not found",
            });
        }

        return res.status(200).json({
            message: "success delete data",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

module.exports = { getTransaksi, getTransaksiById, createTransaksi, updateTransaksi, deleteTransaksi };
