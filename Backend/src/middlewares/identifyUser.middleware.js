const jwt = require("jsonwebtoken");

const identifyUser = async (req, res, next)=>{
     const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Unathorized user"
        })
    }

    let decoded;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message: "Token Invalid"
        })
    }

    req.user = decoded;

    next(); 
}

module.exports = identifyUser;