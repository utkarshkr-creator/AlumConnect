const {StatusCodes} = require('http-status-codes');
const {AlumniRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');
const alumniRepository=new AlumniRepository();
const {Auth}=require('../utils/common');  


async function createAlumni(data){
        try {
            const alumni=await alumniRepository.create(data);
            return alumni;
        } catch (error) {
            console.log(error);
            if(error.name == 'SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError') {
                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });
                throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            }
            throw new AppError(error.original.sqlMessage, StatusCodes.INTERNAL_SERVER_ERROR);
        
        }
}
async function signin(data) {
    try {
        const user = await alumniRepository.getUserByEmail(data.email);
        if(!user) {
            throw new AppError('No user found for the given email', StatusCodes.NOT_FOUND);
        }
        const passwordMatch = Auth.checkPassword(data.password, user.password);
        
        if(!passwordMatch) {
            throw new AppError('Invalid password', StatusCodes.BAD_REQUEST);
        }
        const jwt = Auth.createToken({id: user.id, email: user.email});
        return jwt;
    } catch(error) {
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong while login', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createAlumni,
    signin,
}