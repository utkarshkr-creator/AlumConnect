const express = require('express');
const router=express.Router();   

const {PictureController}=require('../../controllers');   
const {PictureMiddleware}=require('../../middlewares')

// /api/v1/profilepic/ post
router.post('/',PictureController.createProfilePicture); /// error de rha hai

router.get('/:id',PictureController.getPicture);

module.exports=router;