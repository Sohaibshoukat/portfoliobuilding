const jwt = require('jsonwebtoken')
const JWT_KEY = "ResumeBuilder";

const fetchuser = (req,res,next)=>{

    const Token = req.header('auth-token')
    if(!Token)
    {
        res.status(401).send({error:"Please thenticate token"})
    }

    try {
        const data = jwt.verify(Token,JWT_KEY)
        req.user=data.user;
        
        next();
        
    } catch (error) {
        res.status(401).send({error:"Please authenticate token",error})
    }

   

}

module.exports = fetchuser;