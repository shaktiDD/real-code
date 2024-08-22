const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require("../../models/userModel");
const jwtSecret = "123"

const login =async (req,res)=>{
    const { email, password } = req.body;

    try{
        const user  = await UserModel.findOne({email:email});

        if(!user){
            return res.status(400).json({
                message:"User Not Found",
            })
        }
        const isMatch = await bycrpt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                message:"Wrong Password",
            })
        }
        const token = jwt.sign({userId : user._id,},jwtSecret, {expiresIn: "1h"});
        return res.status(200).json({
            token:token,
            "msg":"User successfully logged in",
        })
    }
    catch(err){
        return res.status(500).json({
            msg:"User Not Found",
        })
    }
}

module.exports = login;