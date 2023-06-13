const express = require('express');


const router = express.Router();

const AlumniRoutes=require('./alumni-route')

router.use('/alumni',AlumniRoutes);


module.exports = router;
