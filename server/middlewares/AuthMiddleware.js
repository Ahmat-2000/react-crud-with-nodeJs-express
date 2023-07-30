const {verify} = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const token = req.header("token");
    if(!token) return res.json({error :"User not logged in!"});
    try {
        const validToken = verify(token, "CrudSecretKeyForJsonWebToken");
        req.user = validToken;
        if(validToken) return next();
    } catch (error) {
        console.log(error);
        return res.json({ error: "DON'T TRY TO CHANGE THE COOKIES, IT AIN'T WORK :)"})
    }
};

module.exports = {validateToken};