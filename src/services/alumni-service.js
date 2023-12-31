const {StatusCodes} = require('http-status-codes');
const {AlumniRepository, RoleRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');
const alumniRepository=new AlumniRepository();
const roleRepo=new RoleRepository();
const { Auth, Enums } = require('../utils/common');


async function createAlumni(data){
        try {
            const alumni=await alumniRepository.create(data);
            // const popa=await createProfile({
            //     alumni_id:alumni.id, 
            // });
            await alumni.createProfile();
            const role = await roleRepo.getRoleByName(Enums.USER_ROLES_ENUMS.CUSTOMER);
            await alumni.addRole(role);
            const res={
                name:alumni.name,
                id:alumni.id,
                
            }
            
            return res;  
        } catch (error) {
            console.log(error);
            if(error.name == 'SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError') {
                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });
                throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            }
            throw error;
            // throw new AppError(error.original.sqlMessage, StatusCodes.INTERNAL_SERVER_ERROR);
        
        }
}
async function signin(data) {
    try {
        // console.log(data);
        const user = await alumniRepository.getUserByEmail(data.email);
        // console.log(user);
        if(!user) {
            throw new AppError('No user found for the given email', StatusCodes.NOT_FOUND);
            
        }
        const passwordMatch = Auth.checkPassword(data.password, user.password);
        if(!passwordMatch) {
            throw new AppError('Invalid password', StatusCodes.BAD_REQUEST);
           
        }
        const jwt = Auth.createToken({id: user.id, email: user.email});
        // console.log("jwt Clear");
        return jwt;
    } catch(error) {
        // console.log(error);
        if(error instanceof AppError) throw error;
        
        throw new AppError('Something went wrong while login', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAll(){
    try {
        const alumnis=await alumniRepository.getAll();
        return alumnis;
    } catch (error) {
        throw new AppError("Somthing Went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
    
    }
}
async function get(id){
    try {
        // console.log(id);
        const alumni=await alumniRepository.get(id);
        const res={
            name:alumni.name,
            id:alumni.id,
            email:alumni.email,
            phoneNumber:alumni.phoneNumber,
            graduationYear:alumni.graduationYear,
            branch:alumni.branch
        }
        return res;
    } catch (error) {
        throw new AppError("Somthing Went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
    
    }
}
async function getRes(id){
    try {
        // console.log(id);
        const alumni=await alumniRepository.get(id);
        const res={
            name:alumni.name,
            id:alumni.id,
            graduationYear:alumni.graduationYear,
            branch:alumni.branch
        }
        return res;
    } catch (error) {
        throw new AppError("Somthing Went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
    
    }
}
async function getUserByName(name){
    try {
        const alumni=await alumniRepository.getUserByName(name);
        return alumni;
    } catch (error) {
         
        throw new AppError("Somthing Went wrong ", StatusCodes.INTERNAL_SERVER_ERROR);
    
    }
}
async function getUserByBranch(branch){
    try {
        // console.log(branch)
        const alumni=await alumniRepository.getUserByBranch(branch);
        return alumni;
    } catch (error) {
         
        throw new AppError("Somthing Went wrong ", StatusCodes.INTERNAL_SERVER_ERROR);
    
    }
}
async function getUserByBatch(batch){
    try {
        // console.log(branch)
        const alumni=await alumniRepository.getUserByBatch(batch);
        return alumni;
    } catch (error) {
         
        throw new AppError("Somthing Went wrong ", StatusCodes.INTERNAL_SERVER_ERROR);
    
    }
}

async function isAuthenticated(token) {
    try {
        // console.log(token);
        if(!token) {
            throw new AppError('Missing JWT token', StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        const user = await alumniRepository.get(response.id);
        // console.log("use is",user.id);
        if(!user) {
            throw new AppError('No user found', StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch(error) {
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError') {
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'TokenExpiredError') {
            throw new AppError('JWT token expired', StatusCodes.BAD_REQUEST);
        }
        // console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports={
    createAlumni,
    signin,
    getAll,
    getUserByName,
    getUserByBranch,
    isAuthenticated,
    getUserByBatch,
    getRes,
    get,

}