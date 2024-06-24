const Paket = require('../models/PaketModel');

const getPaket = async (req, res) => {
    try {
        const paket = await Paket.findAll();
        return res.status(200).json({
            data: paket,
            message: "success get all data",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const getPaketById = async (req, res) => {
    try {
        const { id } = req.params;
        const paket = await Paket.findOne({ where: { id } });

        if (!paket) {
            return res.status(404).json({
                message: "Paket not found",
            });
        }

        return res.status(200).json({
            data: paket,
            message: "success get data",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const createPaket = async (req, res) => {
    try {
        const { kota_id, alamat_pickup, alamat_deliv, nama_penerima, telp_penerima, nama_pengirim, telp_pengirim, status, keterangan, id_user } = req.body;

        const data = await Paket.create({
            kota_id,
            alamat_pickup,
            alamat_deliv,
            nama_penerima,
            telp_penerima,
            nama_pengirim,
            telp_pengirim,
            status,
            keterangan,
            id_user
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

const updatePaket = async (req, res) => {
    try {
        const { id } = req.params;
        const { kota_id, alamat_pickup, alamat_deliv, nama_penerima, telp_penerima, nama_pengirim, telp_pengirim, status, keterangan, id_user } = req.body;

        const [updated] = await Paket.update(
            { kota_id, alamat_pickup, alamat_deliv, nama_penerima, telp_penerima, nama_pengirim, telp_pengirim, status, keterangan, id_user },
            { where: { id } }
        );

        if (updated === 0) {
            return res.status(404).json({
                message: "Paket not found",
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

const deletePaket = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Paket.destroy({
            where: { id }
        });

        if (deleted === 0) {
            return res.status(404).json({
                message: "Paket not found",
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

module.exports = { getPaket, getPaketById, createPaket, updatePaket, deletePaket };
