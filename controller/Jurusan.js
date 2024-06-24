const Jurusan = require('../models/JurusanModel');
const Mobil = require('../models/MobilModel');

const getJurusan = async (req, res) => {
    try {
        const jurusan = await Jurusan.findAll();
        return res.status(200).json({
            data: jurusan,
            message: "success get all data",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const getJurusanById = async (req, res) => {
    try {
        const { id } = req.params;
        const jurusan = await Jurusan.findOne({ where: { id } });

        if (!jurusan) {
            return res.status(404).json({
                message: "Jurusan not found",
            });
        }

        return res.status(200).json({
            data: jurusan,
            message: "success get data",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const createJurusan = async (req, res) => {
    try {
        const { kota_id, jam, tanggal, harga, mobil_id } = req.body;

        const [jamStr, menitStr] = jam.split(':');
        const waktu = new Date();
        waktu.setHours(parseInt(jamStr, 10));
        waktu.setMinutes(parseInt(menitStr, 10));

        const [tanggalStr, bulanStr, tahunStr] = tanggal.split('-');
        const tanggalObj = new Date(`${tahunStr}-${bulanStr}-${tanggalStr}`);

        const data = await Jurusan.create({
            kota_id,
            jam: waktu,
            tanggal: tanggalObj,
            harga,
            mobil_id,
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

const updateJurusan = async (req, res) => {
    try {
        const { id } = req.params;
        const { kota_id, jam, tanggal, harga, mobil_id } = req.body;

        const [jamStr, menitStr] = jam.split(':');
        const waktu = new Date();
        waktu.setHours(parseInt(jamStr, 10));
        waktu.setMinutes(parseInt(menitStr, 10));

        const [tanggalStr, bulanStr, tahunStr] = tanggal.split('-');
        const tanggalObj = new Date(`${tahunStr}-${bulanStr}-${tanggalStr}`);

        const jurusan = await Jurusan.findByPk(id);
        if (!jurusan) {
            return res.status(404).json({
                message: "Jurusan not found",
            });
        }

        await jurusan.update({
            kota_id,
            jam: waktu,
            tanggal: tanggalObj,
            harga,
            mobil_id,
        });

        return res.status(200).json({
            data: jurusan,
            message: "success update data",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const deleteJurusan = async (req, res) => {
    try {
        const { id } = req.params;

        const jurusan = await Jurusan.findByPk(id);
        if (!jurusan) {
            return res.status(404).json({
                message: "Jurusan not found",
            });
        }

        await jurusan.destroy();

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

module.exports = { getJurusan, getJurusanById, createJurusan, updateJurusan, deleteJurusan };
