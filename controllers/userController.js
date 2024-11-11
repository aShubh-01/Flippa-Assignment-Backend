const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { prisma, jwtSecret } = require('../config');
const { userDataSchema, partialUserDataSchema } = require('../validations/userSchemas');

exports.register = async (req, res) => {

    const parseReponse = userDataSchema.safeParse(req.body);
    
    if(!parseReponse.success) {
        return res.status(411).json({
            message: "Invalid User Inputs",
            issues: parseReponse.error.issues.map((issue) => (issue.message))
        })
    }
    
    const { username, email, password } = req.body;

    try {
        const existingUser = await prisma.user.findFirst({
            where: { email: email }
        })

        if(existingUser) {
            return res.status(411).json({
                message: "User already exists/Email already taken"
            })
        }

        const newUser = await prisma.user.create({
            data: {
                name: username,
                password: await bcrypt.hash(password, 10),
                email: email
            },
            select: { id: true, role: true }
        })

        const token = jwt.sign({ id: newUser.id, role: newUser.role }, jwtSecret, { expiresIn: '1h'} );

        return res.status(200).json({
            message: "User Registered",
            token: token
        })

    } catch (err) {
        console.log(err);
    }

    return res.status(500).json({
        message: "Unable to Register user"
    })
}

exports.login = async (req, res) => {
    const parseResponse = partialUserDataSchema.safeParse(req.body);
    if(!parseResponse.success) {
        return res.status(411).json({
            message: "Invalid User Input",
            issues: parseResponse.error.issues.map((issue) => (issue.message))
        })
    }

    const { email, password } = req.body;

    try {
        const exisitngUser = await prisma.user.findFirst({
            where: { email: email }
        })
    
        if(!exisitngUser || !exisitngUser.email) {
            return res.status(411).json({
                message: "User doenst exist"
            })
        }
    
        isPasswordMatched = await bcrypt.compare(password, exisitngUser.password);
    
        if(!isPasswordMatched) {
            return res.status(411).json({
                message: "Incorrect Password"
            })

        }
        
        const token = jwt.sign({ id: exisitngUser.id, role: exisitngUser.role }, jwtSecret, { expiresIn: '1h'} );

        return res.status(200).json({
            message: "Logged In Successfully!",
            token: token
        })

    } catch (err) {
        console.log(err);
    }

    return res.status(500).json({
        message: "Unable to login"
    })
}