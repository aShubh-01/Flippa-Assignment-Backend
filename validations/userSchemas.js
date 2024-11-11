const { z } = require('zod');

const userDataSchema = z.object({
    username: z.string({message: "Username must be an string"}).min(1, { message: "Username cannot be empty"} ),
    email: z.string({ message: "Email must be an string"}),
    password: z.string({ message: "Password must be an string"}).min(6, { message: "Password must be atleast 6 characters long "})
})

const partialUserDataSchema = userDataSchema.partial();

module.exports = {
    userDataSchema, 
    partialUserDataSchema
}