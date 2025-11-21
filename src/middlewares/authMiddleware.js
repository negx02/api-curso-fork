import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();    

const verifyToken = (req, res, next) => {
    const {token, refreshToken} = req.cookies;

    
    if (!token) {
        return res.status(401).json({error: "No se proporcionó un token"});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({error: "Token inválido"});
        }
        req.user = user;
        next();
    });
};  

export default verifyToken;