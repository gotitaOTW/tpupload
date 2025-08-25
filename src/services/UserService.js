import UserRepository from "../repositories/UserRepository.js";


class UserService{

    constructor(){
        this.UserRepository = new UserRepository();
    }
    
    geyByIdAsync = async (id)=>
    {
        const returnEntity = await this.UserRepository.getByIdAsync(id);
        return returnEntity;
    }

    updateAsync = async (entity) => {
        const rowsAffected = await this.UserRepository.updateAsync(entity);
        return rowsAffected;
    }
}

export default UserService