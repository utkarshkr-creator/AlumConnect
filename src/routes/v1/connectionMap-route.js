const express=require('express');   

const router=express.Router();  
const {ConnectionMapMiddleware}=require('../../middlewares');
const {ConnectionMapController}=require('../../controllers');

router.post('/',ConnectionMapMiddleware.validateCreateRequest,ConnectionMapController.createConnection);
router.get('/:senderId/:receiverId',ConnectionMapController.getByIds);


module.exports=router;