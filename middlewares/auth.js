const jwt = require('jsonwebtokens');
const { jwtSecret, prisma } = require('../config');

exports.verifyUser = async (req, res, next) => {
    const token = req.headers.token;
    const decodedJWT = await jwt.verify(token, jwtSecret);

    if(!decodedJWT) {
        return res.status(411).json({
            message: "Unauthorized Request"
        })
    }
    
    try {
        const exisitngUser = await prisma.user.findFirst({
            where: { 
                id: decodedJWT.id,
                role: decodedJWT.role
            }
        })

        if(exisitngUser) {
            req.userId = exisitngUser.id;
            next();
        }
        return;

    } catch (err) {
        console.log(err);
    }

    return res.status(500).json({
        message: "Unable to authenticate"
    })
}