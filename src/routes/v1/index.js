const express = require('express');


const router = express.Router();

const AlumniRoutes=require('./alumni-route')
const ProfileRoutes=require('./profile-routes')
const AuthRoutes=require('./auth')
router.use('/alumni',AlumniRoutes);
router.use('/profile',ProfileRoutes );
router.use('/auth',AuthRoutes);



module.exports = router;
