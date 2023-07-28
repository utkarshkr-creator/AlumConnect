const express = require('express');


const router = express.Router();

const AlumniRoutes=require('./alumni-route')
const ProfileRoutes=require('./profile-routes')
const AuthRoutes=require('./auth')
const newConnectinRoutes=require('./connectionMap-route')


router.use('/alumni',AlumniRoutes);
router.use('/profile',ProfileRoutes );
router.use('/auth',AuthRoutes);
router.use('/newconnection',newConnectinRoutes);


module.exports = router;
