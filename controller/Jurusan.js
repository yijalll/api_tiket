const { where } = require('sequelize');
const Jurusan = require('../models/JurusanModel');
const Kotum = require('../models/KotaModel');
const Mobil = require('../models/MobilModel');


const getJurusan = async (req, res) => {
    try {
        const jurusan = await Jurusan.findAll({
            where:{isActive:true},
            include: [
                { model: Mobil, },
                { model: Kotum }
            ]
        });

        const responData = jurusan.map((data) => {
            return {
                id: data.id,
                kota: {
                    id: data.kota_id,
                    nama_kota: data.Kotum.nama_kota
                },
                mobil: {
                    id: data.mobil_id,
                    nama_mobil: data.Mobil.nama_mobil
                },
                jam: data.jam,
                tanggal: data.tanggal,
                harga: data.harga,
                isActive: data.isActive,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            };
        });

        if (responData.length === 0) {
            return res.status(400).json({
                message: 'Cannot get this transaction',
            });
        } else {
            return res.status(200).json({
                data: responData,
                message: "Success get all data",
            });
        }
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
        const { nama, kota_id, jam, tanggal, harga, mobil_id } = req.body;

        const [jamStr, menitStr] = jam.split(':');
        const waktu = new Date();
        waktu.setHours(parseInt(jamStr, 10));
        waktu.setMinutes(parseInt(menitStr, 10));

        const [tanggalStr, bulanStr, tahunStr] = tanggal.split('-');
        const tanggalObj = new Date(`${tahunStr}-${bulanStr}-${tanggalStr}`);

        const data = await Jurusan.create({
            nama,
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
        const { nama, kota_id, jam, tanggal, harga, mobil_id } = req.body;

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
            nama,
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

const changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        const jurusan = await Jurusan.findByPk(id);
        if (!jurusan) {
            return res.status(404).json({
                message: "Jurusan not found",
            });
        }

        const update = await Jurusan.update({
            isActive
        },
            { where: { id } }
        )

        return res.status(200).json({
            message: "sukses update data",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

module.exports = { getJurusan, getJurusanById, createJurusan, updateJurusan, deleteJurusan, changeStatus };
