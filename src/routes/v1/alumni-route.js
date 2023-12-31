const express = require('express');
const router=express.Router();   

const {AlumniController}=require('../../controllers');
const {AlumniMiddleware}=require('../../middlewares');  

// /api/v1/alumni/signup post
router.post('/signup',AlumniController.createAlumni);

router.post('/signin',AlumniController.signin);

router.get('/getall',AlumniController.getAll);

router.get('/profile',AlumniMiddleware.checkAuth,AlumniController.profileAuthenticated)
router.get('/userProfile/:user',AlumniController.profile)

router.get('/name',
        AlumniMiddleware.validateGetByName,
        AlumniController.getUserByName);

router.get('/branch',
        AlumniMiddleware.validateGetByBranch,
        AlumniController.getUserByBranch);
router.get('/batch',
        AlumniMiddleware.validateGetByBatch,
        AlumniController.getUserByBatch);



module.exports=router;