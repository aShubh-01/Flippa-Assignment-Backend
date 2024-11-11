const jwt = require('jsonwebtoken');
const { jwtSecret, prisma } = require('../config');

exports.verifyUser = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({
            message: "Unauthorized Request"
        })
    }

    try {
        const decodedJWT = await jwt.verify(token, jwtSecret);

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