const Paket = require('../models/PaketModel');

const getPaket = async (req, res) => {
    try {
        const paket = await Paket.findAll();
        const responData = paket.map((data)=>{
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
            
        return res.status(200).json({
            data: responData,
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

        const responData = {
            id : paket.id,
            isi: paket.isi_paket,
            pengirim : {
                nama : paket.nama_pengirim,
                telp : paket.telp_pengirim,
                alamat : paket.alamat_pickup,
                provinsi : paket.provinsi_pengirim,
                kota_kab : paket.kota_kab_pengirim,
                kecamatan : paket.kecamatan_pengirim,
                kelurahan : paket.kelurahan_pengirim,
            },
            penerima : {
                nama : paket.nama_penerima,
                telp : paket.telp_penerima,
                alamat : paket.alamat_deliv,
                provinsi : paket.provinsi_penerima,
                kota_kab : paket.kota_kab_penerima,
                kecamatan : paket.kecamatan_penerima,
                kelurahan : paket.kelurahan_penerima,
            }
        }
        if (!paket) {
            return res.status(404).json({
                message: "Paket not found",
            });
        }

        return res.status(200).json({
            data: responData,
            message: "success get data",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const getStruk = async (req, res) => {
    try {
        const { id } = req.params;
        const paket = await Paket.findOne({ where: { id } });

        const responData = {
            id : paket.id,
            isi: paket.isi_paket,
            pengirim : {
                nama : paket.nama_pengirim,
                telp : paket.telp_pengirim,
                alamat : paket.alamat_pickup,
                provinsi : paket.provinsi_pengirim,
                kota_kab : paket.kota_kab_pengirim,
                kecamatan : paket.kecamatan_pengirim,
                kelurahan : paket.kelurahan_pengirim,
            },
            penerima : {
                nama : paket.nama_penerima,
                telp : paket.telp_penerima,
                alamat : paket.alamat_deliv,
                provinsi : paket.provinsi_penerima,
                kota_kab : paket.kota_kab_penerima,
                kecamatan : paket.kecamatan_penerima,
                kelurahan : paket.kelurahan_penerima,
            }
        }
        if (!paket) {
            return res.status(404).json({
                message: "Paket not found",
            });
        }

        return res.status(200).json({
            data: responData,
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
       const {isi, pengirim, penerima} = req.body; 

       await Paket.create({
            alamat_pickup: pengirim.alamat,
            alamat_deliv: penerima.alamat,
            nama_penerima: penerima.nama,
            telp_penerima: penerima.telp,
            nama_pengirim: pengirim.nama,
            telp_pengirim: pengirim.telp,
            id_user: req.id,
            isi_paket: isi,
            provinsi_penerima: penerima.provinsi,
            provinsi_pengirim: pengirim.provinsi,
            kota_kab_penerima: penerima.kota_kab,
            kota_kab_pengirim: pengirim.kota_kab,
            kecamatan_pengirim: pengirim.kecamatan,
            kecamatan_penerima: penerima.kecamatan,
            kelurahan_pengirim: pengirim.kelurahan,
            kelurahan_penerima: penerima.kelurahan
        });

        const responData = req.body

        return res.status(201).json({
            data: responData,
            message: "Berhasil menginput data paket",
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
        const {isi, pengirim, penerima} = req.body; 

        const [updated] = await Paket.update(
           {
            alamat_pickup: pengirim.alamat,
            alamat_deliv: penerima.alamat,
            nama_penerima: penerima.nama,
            telp_penerima: penerima.telp,
            nama_pengirim: pengirim.nama,
            telp_pengirim: pengirim.telp,
            id_user: req.id,
            isi_paket: isi,
            provinsi_penerima: penerima.provinsi,
            provinsi_pengirim: pengirim.provinsi,
            kota_kab_penerima: penerima.kota_kab,
            kota_kab_pengirim: pengirim.kota_kab,
            kecamatan_pengirim: pengirim.kecamatan,
            kecamatan_penerima: penerima.kecamatan,
            kelurahan_pengirim: pengirim.kelurahan,
            kelurahan_penerima: penerima.kelurahan
           },
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

const update_status = async(req,res) => {
    try { 
        const {id}= req.params
        const [updated] = await Paket.update(
            {
             status : "Diterima"
            },
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
}

module.exports = { getPaket, getPaketById, createPaket, updatePaket, deletePaket, update_status, getStruk };
