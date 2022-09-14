// backend/routes/index.js
const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

router.use('/api', apiRouter);
router.get('/hello/world', function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});

// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    });
});
// ...

module.exports = router;

/*
Spots
npx sequelize model:generate --name Spot --attributes ownerId:integer,address:string,city:string,state:string,country:string,lat:float,lng:float,name:string,description:string,price:number,avgRating:float,previewImage:string

Images

*/