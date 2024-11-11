const dotenv = require('dotenv')
const { PrismaClient } = require('@prisma/client');

dotenv.config( { path : './.env'} );

exports.prisma = new PrismaClient();
exports.jwtSecret = process.env.JWT_SECRET;
exports.port = process.env.PORT || 3000;