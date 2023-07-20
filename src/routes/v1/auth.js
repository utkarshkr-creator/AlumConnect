const  express=require('express')

const router=express.Router();   
 

const {AlumniMiddleware}=require('../../middlewares');  
router.get('/',AlumniMiddleware.checkAuthOnly);

module.exports=router;