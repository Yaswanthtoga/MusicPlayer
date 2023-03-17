import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next)=>{
    const cooke = req.headers.cookie
    const token = cooke.split('=')[1];

    // Verify the Access Token
    if(!token)res.status(401).json("Not Authenticated");

    jwt.verify(token,process.env.JWT_KEY,(err,id)=>{
        if(err){
            res.status(403).json("Token is not valid");
        }else{
            req.body.userId=id.id;
            next()
        }
    });
}