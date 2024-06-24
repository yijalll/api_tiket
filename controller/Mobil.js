const Mobil = require('../models/MobilModel');

const getMobil = async (req, res) => {
    try {
        const mobil = await Mobil.findAll();
        return res.status(200).json({
            data: mobil,
            message: "success get all data",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const getMobilById = async (req, res) => {
    try {
        const { id } = req.params;
        const mobil = await Mobil.findOne({ where: { id } });

        if (!mobil) {
            return res.status(404).json({
                message: "Mobil not found",
            });
        }

        return res.status(200).json({
            data: mobil,
            message: "success get data",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const createMobil = async (req, res) => {
    try {
        const { nama_mobil, jumlah_seat } = req.body;

        const data = await Mobil.create({
            nama_mobil,
            jumlah_seat
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

const updateMobil = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_mobil, jumlah_seat } = req.body;

        const [updated] = await Mobil.update(
            { nama_mobil, jumlah_seat },
            { where: { id } }
        );

        if (updated === 0) {
            return res.status(404).json({
                message: "Mobil not found",
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

const deleteMobil = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Mobil.destroy({
            where: { id }
        });

        if (deleted === 0) {
            return res.status(404).json({
                message: "Mobil not found",
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

module.exports = { getMobil, getMobilById, createMobil, updateMobil, deleteMobil };
