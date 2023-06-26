const express = require('express');


const router = express.Router();

const AlumniRoutes=require('./alumni-route')
const ProfilePicRoutes=require('./picture-routes')
router.use('/alumni',AlumniRoutes);
router.use('/profilepic',ProfilePicRoutes );


module.exports = router;
