const express = require('express');
const router=express.Router();   

const {ProfileController}=require('../../controllers');   
const {ProfileMiddleware}=require('../../middlewares')

// /api/v1/profilepic/ post
router.post('/',ProfileController.createProfile); 

router.get('/:id',ProfileController.getProfile);

router.post('/:id',ProfileMiddleware.validateCreateRequest, ProfileController.updateProfile);

module.exports=router;