const express = require('express');
const { verifyUser } = require('../middlewares/auth');
const { createBid } = require('../controllers/bidsController');

const bidRouter = express.Router();

bidRouter.use(verifyUser)

bidRouter.post('/create', createBid);

module.exports = bidRouter;