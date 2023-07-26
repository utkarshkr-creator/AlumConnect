const express=require('express');


const router=express.Router();  
const {ConnectionController}=require('../../controllers')  
const {ConnectionMiddleware}=require('../../middlewares')


router.post('/',ConnectionMiddleware.validateCreateRequest,ConnectionController.create);
router.get('/:id',ConnectionController.getbyId);

module.exports=router;