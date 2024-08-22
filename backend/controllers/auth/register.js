
const bcrypt = require('bcrypt');
const UserModel = require("../../models/userModel");




const register = async (req, res) => {
    try{
        console.log('Request Body:', req.body); // Log request bodconsole.log('Request Body:', req.body); // Log request bod
        const {name, password,email} = req.body;
        const existingUser = await UserModel.findOne({email:email})
        if(existingUser){
            return res.status(400).json({
                "msg":"this email already exist"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({
            name,
            password: hashedpassword,
            email
        })
        await newUser.save();
        res.status(201).json({
            msg:"User successfully registered",
        })
    }catch (e) {
        res.status(500).json({
            "error":e.message
        })
    }

}
module.exports = register;