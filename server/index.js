const express = require('express');
const app = express();
const port = 3001;
const Cognito = require('./cognito');
Cognito.init('us-east-1');

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.get('/api/user-pools', async (req, res) => {
    const pools = await Cognito.getUserPools();
    return res.status(200).json({
        status: 200,
        data: pools
    });
});

app.get('/api/users/:poolId', async (req, res) => {
    const users = await Cognito.getUsersForPool(req.params.poolId);
    return res.status(200).json({
        status: 200,
        data: users
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
