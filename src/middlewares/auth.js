const jwt = require("jsonwebtoken")
const SCERET_KEY=process.env.SCERET_KEY;

const auth =(req,res,next)=>{
    try {
        let token = req.headers.authorization;
        console.log(`token -${req.headers.authorization}`)
        if(token){
            token = token.split(" ")[1];
            let user = jwt.verify(token,SCERET_KEY)
            // Here user-->{
            //     email: '12458@gmail.com',
            //     id: '6531f2a6eab7f81993d9be08',
            //     iat: 1697772198
            //}
            req.userId=user.id

        }else{ 
            return res.status(401).json({message:"Unathorised User"})
        }
        next();
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:"Unathorised User"})
        
    }
} 

module.exports = auth