const KotaModel = require('../models/KotaModel');

const getKota = async (req, res) => {
    try {
        const kota = await KotaModel.findAll();
        return res.status(200).json({
            data: kota,
            message: "success get all data",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const getKotaById = async (req, res) => {
    try {
        const { id } = req.params;
        const kota = await KotaModel.findOne({ where: { id } });

        if (!kota) {
            return res.status(404).json({
                message: "Kota not found",
            });
        }

        return res.status(200).json({
            data: kota,
            message: "success get data",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const createKota = async (req, res) => {
    try {
        const { nama_kota } = req.body;

        const data = await KotaModel.create({
            nama_kota: nama_kota
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

const updateKota = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_kota } = req.body;

        const data = await KotaModel.update(
            { nama_kota: nama_kota },
            { where: { id: id } }
        );

        if (data[0] === 0) {
            return res.status(404).json({
                message: "Kota not found",
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

const deleteKota = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await KotaModel.destroy({
            where: { id: id }
        });

        if (result === 0) {
            return res.status(404).json({
                message: "Kota not found",
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

module.exports = { getKota, getKotaById, createKota, updateKota, deleteKota };
