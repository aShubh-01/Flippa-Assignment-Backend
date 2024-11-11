const express = require('express');
const { verifyUser } = require('../middlewares/auth');
const { createAsset, findAllActive } = require('../controllers/assetsController');

const assetRouter = express.Router();

assetRouter.use(verifyUser);

assetRouter.post('/create', createAsset);
assetRouter.get('/allActive', findAllActive);

module.exports = assetRouter;