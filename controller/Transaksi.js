const Transaksi = require('../models/TransaksiModel');
const Users = require('../models/UserModel')
const Jurusan = require('../models/JurusanModel')
const Paket = require('../models/PaketModel')


const getTransaksi = async (req, res) => {
    try {
        const id = req.id
        const transaksi = await Transaksi.findAll({
            where: {user_id: id},
            include: {
                model : Jurusan
            }
        },);

        const paket = await Paket.findAll();
        const responDataPaket = paket.map((data)=>{
            return {
                id : data.id,
                isi: data.isi_paket,
                pengirim : {
                    nama : data.nama_pengirim,
                    telp : data.telp_pengirim,
                    alamat : data.alamat_pickup,
                    provinsi : data.provinsi_pengirim,
                    kota_kab : data.kota_kab_pengirim,
                    kecamatan : data.kecamatan_pengirim,
                    kelurahan : data.kelurahan_pengirim,
                },
                penerima : {
                    nama : data.nama_penerima,
                    telp : data.telp_penerima,
                    alamat : data.alamat_deliv,
                    provinsi : data.provinsi_penerima,
                    kota_kab : data.kota_kab_penerima,
                    kecamatan : data.kecamatan_penerima,
                    kelurahan : data.kelurahan_penerima,
                }
            }
        })

        const responDatatransaksi = transaksi.map((data)=>{
            return {
                id: data.id,
                jurusan: {
                    id: data.jurusan_id,
                    nama : data.Jurusan.nama
                },
                user : {
                    nama: data.nama,
                    telp: data.telp,
                    jk: data.jk,
                    user_id: data.user_id,
                    alamat: data.alamat,
                    kontak_darurat: data.kontak_darurat,
                },
                    ispaid: data.ispaid,   
                    bukti_bayar: data.bukti_bayar,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt
                }
        })
        if (transaksi.length == 0) {
            return res.status(400).json({
                message: 'cant get this transaction',
            });
        } else {
            return res.status(200).json({
                dataTransaksi: responDatatransaksi,
                dataPaket : responDataPaket ,
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

const getTransaksiAdmin = async (req, res) => {
    try {
        const transaksi = await Transaksi.findAll({
            include: {
                model : Jurusan
            }
        },);
        const responData = transaksi.map((data)=>{
            return {
                id: data.id,
                jurusan: {
                    id: data.jurusan_id,
                    nama : data.Jurusan.nama
                },
                user : {
                    nama: data.nama,
                    telp: data.telp,
                    jk: data.jk,
                    user_id: data.user_id,
                    alamat: data.alamat,
                    kontak_darurat: data.kontak_darurat,
                },
                    ispaid: data.ispaid,   
                    bukti_bayar: data.bukti_bayar,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt
                }
        })
        if (transaksi.length == 0) {
            return res.status(400).json({
                message: 'cant get this transaction',
            });
        } else {
            return res.status(200).json({
                data: responData,
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
        const transaksi = await Transaksi.findOne({ 
            where: { id },
            include :{
                model: Jurusan
            }
        
        });

        if (!transaksi) {
            return res.status(404).json({
                message: "Transaksi not found",
            });
        }

        const responseData = {
            id: transaksi.id,
            jurusan: {
                id: transaksi.jurusan_id,
                nama : transaksi.Jurusan.nama
            },
           user : {
            nama: transaksi.nama,
            telp: transaksi.telp,
            jk: transaksi.jk,
            user_id: transaksi.user_id,
            alamat: transaksi.alamat,
            kontak_darurat: transaksi.kontak_darurat,
        },
            ispaid: transaksi.ispaid,   
            bukti_bayar: transaksi.bukti_bayar,
            createdAt: transaksi.createdAt,
            updatedAt: transaksi.updatedAt
        };
        return res.status(200).json({
            data: responseData,
            message: "success get data",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const getTransaksiTiket = async (req, res) => {
    try {
        const { id } = req.params;
        const transaksi = await Transaksi.findOne({ 
            where: { id },
            include :{
                model: Jurusan,
            }
        
        });

        if (!transaksi) {
            return res.status(404).json({
                message: "Transaksi not found",
            });
        }

        const responseData = {
            id: transaksi.id,
            jurusan: {
                nama : transaksi.Jurusan.nama,
                harga: transaksi.Jurusan.harga,
                tanggal : transaksi.Jurusan.tanggal,
                jam : transaksi.Jurusan.jam,

            },
           user : {
            nama: transaksi.nama,
            telp: transaksi.telp,
            jk: transaksi.jk,
            user_id: transaksi.user_id,
            alamat: transaksi.alamat,
            kontak_darurat: transaksi.kontak_darurat,
        },
            createdAt: transaksi.createdAt,
            updatedAt: transaksi.updatedAt
        };
        return res.status(200).json({
            data: responseData,
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
        const user_id = req.id
        const { jurusan_id, nama, telp, jk, ispaid, alamat, kontak_darurat } = req.body;
        if (!jurusan_id || !nama || !telp || !jk || ispaid === undefined || !user_id || !alamat || !kontak_darurat) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const jurusan = await Jurusan.findOne ({
            where : {
                id : jurusan_id
            }
        })
        if(!jurusan) return res.status(404).json ({massage : "jurusan tidak ditemukan"}) 

        // const bukti_bayar = "Blank.png";
        const bukti_bayar = req.file?.cloudStoragePublicUrl || "Blank.png";

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
                nama_jurusan: jurusan.nama
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
            data: responseData,
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
        const { jurusan_id, nama, telp, jk, ispaid, alamat, kontak_darurat } = req.body;

        if (!jurusan_id || !nama || !telp || !jk || ispaid === undefined || !alamat || !kontak_darurat) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const transaksi = await Transaksi.findOne({
            where: {
                id
            }
        });

        if (!transaksi) return res.status(404).json({ message: "Transaksi tidak ditemukan" });

        const jurusan = await Jurusan.findOne({
            where: {
                id: jurusan_id
            }
        });

        if (!jurusan) return res.status(404).json({ message: "Jurusan tidak ditemukan" });

        await transaksi.update({
            jurusan_id,
            nama,
            telp,
            jk,
            ispaid,
            alamat,
            kontak_darurat
            // Keep the existing bukti_bayar value, do not update it
        });

        const responseData = {
            id: transaksi.id,
            jurusan: {
                id: jurusan.id,
                nama: jurusan.nama
            },
            nama: transaksi.nama,
            telp: transaksi.telp,
            jk: transaksi.jk,
            ispaid: transaksi.ispaid,
            alamat: transaksi.alamat,
            kontak_darurat: transaksi.kontak_darurat,
            bukti_bayar: transaksi.bukti_bayar, 
            createdAt: transaksi.createdAt,
            updatedAt: transaksi.updatedAt
        };

        return res.status(200).json({
            data: responseData,
            message: "Success update data",
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

module.exports = { getTransaksi, getTransaksiById, createTransaksi, updateTransaksi, deleteTransaksi, getTransaksiAdmin, getTransaksiTiket };
