const jwt= require ("jsonwebtoken");
const Token = require ("../models/TokenModel")
const User = require ("../models/UserModel")

// import jwt from "jsonwebtoken";
// import Token from "../models/Tokenmodel.js"
// import User from "../models/UserModel.js"

const verifyToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    // const [blacklist] = await Token.findAll({
    //     where: {
    //         token : token
    //     }
    // });
    // if(blacklist)return res.sendStatus(403);
    console.log (authHeader)
    console.log (token)
    try {
        const jwtVerify = jwt.verify(token, process.env.JWT_SECRET)
        req.id = jwtVerify.id;
        req.email = jwtVerify.email;
        // console.log(jwtVerify);
        next();
    } catch (error) {
        console.log (error.message)
        res.json({
            message : error.message
        })
    }
}

// export const adminOnly = async (req, res, next) =>{
//     const user = await User.findOne({
//         where: {
//             uuid: req.session.userId
//         }
//     });
//     if(!user) return res.status(404).json({msg :"User tidak ditemukan"});
//     if(user.role !== "admin")  return res.status(403).json({msg :"Akses Terlarang"});
//     next();
// }

module.exports = {verifyToken}