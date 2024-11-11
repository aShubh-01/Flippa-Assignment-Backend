const express = require('express');
const cors = require('cors')
const { port } = require('./config');
const userRouter = require('./routers/userRouter');
const assetRouter = require('./routers/assetRouter');
const bidRouter = require('./routers/bidRouter');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/bids', bidRouter);
app.use('/assets', assetRouter);

app.listen(port, () => console.log('Backend in runnin on port ' + port));