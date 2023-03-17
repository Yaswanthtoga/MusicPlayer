import userModel from "../models/user.model.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = async (req,res)=>{
    const { username,password,email } = req.body;
    
    try {
        const user = await userModel.findOne({email});
        if(user){
            res.status(409).json("user existed");
        }

        const hashedPassword = bcrypt.hashSync(password,bcrypt.genSaltSync(10));
        const newUser = new userModel({
            username,
            password:hashedPassword,
            email
        });

        await newUser.save();
        res.status(200).json("Registered Succesfully");

    } catch (error) {
        res.status(500).json("Server Failed");
    }
};


export const login = async (req,res)=>{

    // User Verification
    const { username,password } = req.body;

    try {
        const user = await userModel.findOne({username});
        if(!user){
            res.status(404).json("user doesnot existed");
        }

        const hashedPassword = user.password;
        if(!bcrypt.compareSync(password,hashedPassword)){
            res.status(401).json("Wrong Credentials");
        }

        // Generate Token
        const payload = {id:user._id};
        const token = jwt.sign(payload,process.env.JWT_KEY);


        res.cookie("accessToken",token,{
            httpOnly:true
        }).status(200).json(user);

    } catch (error) {
        res.status(500).json("Server Failed");
    }

};

export const logout = (req,res)=>{
    res.clearCookie("accessToken",{
        sameSite:"none",
        secure:true
    }).status(200).json("Logged Out");
}
