const express = require('express');


const router = express.Router();

const AlumniRoutes=require('./alumni-route')
const ProfileRoutes=require('./profile-routes')
router.use('/alumni',AlumniRoutes);
router.use('/profile',ProfileRoutes );


module.exports = router;
