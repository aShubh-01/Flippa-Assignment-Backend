const dotenv = require('dotenv')

dotenv.config( { path : './.env'} );

exports.port = process.env.PORT || 3000;
exports.jwtSecret = process.env.JWT_SECRET;