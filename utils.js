const jwt = require('jsonwebtoken')

const getToken = (user) => {
    return jwt.sign({
        _id:user.id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
    }, process.env.JWT_SECRET, {
        expiresIn: '48h'
    })
}

const isAuth = (req, res, next) => {
    
    let token = null
    if(req.cookies.auth){
        token = JSON.parse(req.cookies.auth)
    }

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
              return res.status(401).send({ message: 'Invalid Token' });
            }
            req.user = decode;
            next();
            return;
          });
    }else{
        return res.status(401).send({msg: 'Token is not supplied'})
    } 
}

const isAdmin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        return next()
    }
    return res.status(401).send({msg: 'Admin token is not valid'})
}

module.exports = { getToken, isAuth ,isAdmin }