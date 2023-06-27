const express = require('express');
const router=express.Router();   

const {ProfileController}=require('../../controllers');   
const {ProfileMiddleware}=require('../../middlewares')

// /api/v1/profilepic/ post
router.post('/',ProfileController.createProfile); /// error de rha hai

router.get('/:id',ProfileController.getProfile);

module.exports=router;