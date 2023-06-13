const express = require('express');
const router=express.Router();   

const {AlumniController}=require('../../controllers');
const {AlumniMiddleware}=require('../../middlewares');  

// /api/v1/alumni post
router.post('/signup', 
        AlumniMiddleware.validateCreateRequest,
        AlumniController.createAlumni);

router.get('/signin',AlumniController.signin);
module.exports=router;