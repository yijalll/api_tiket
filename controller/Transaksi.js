const Transaksi = require('../models/TransaksiModel');

const getTransaksi = async (req, res) => {
    try {
        const transaksi = await Transaksi.findAll();
        return res.status(200).json({
            data: transaksi,
            message: "success get all data",
        });
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
        const { jurusan_id, nama, telp, jk, ispaid, user_id, jumlah_seat, jumlah_bayar, bukti_bayar } = req.body;

        const data = await Transaksi.create({
            jurusan_id,
            nama,
            telp,
            jk,
            ispaid,
            user_id,
            jumlah_seat,
            jumlah_bayar,
            bukti_bayar
        });
        return res.status(201).json({
            data: data,
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
