const express = require('express');
const { verifyUser } = require('../middlewares/auth');

const assetRouter = express.Router();

assetRouter.use(verifyUser);

module.exports = assetRouter;