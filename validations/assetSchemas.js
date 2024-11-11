const { z } = require('zod');

exports.assetSchema = z.object({
    title: z.string({ message: "Title must be an string"}).min(1, { message: "Title cannot be empty"}),
    description: z.string({ message: "Description must be an string"}).min(1, { message: "Description cannot be empty"}),
    startingPrice: z.number({ message: "Starting Price must be numeric"})
})