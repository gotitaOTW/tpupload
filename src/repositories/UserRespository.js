import config from '../configs/db_config.js';
import pkg from 'pg';
const {Client,Pool} = pkg;

 class UserRepository{
    getDBPool = () => {
        if (this.DBPool == null){
            this.DBPool = new Pool(config);
        }
        return this.DBPool;
    }
    
    getByIdAsync = async (id) => {
        let returnEntity = null;
        try {
            const sql = `SELECT * FROM alumnos WHERE id=$1`;
            const values = [id];
            const resultPg = await this.getDBPool().query(sql, values);
            if (resultPg.rows.length > 0){
                returnEntity = resultPg.rows[0];
            }
        } catch (error) {
            LogHelper.logError(error);
        } 
        return returnEntity;
    }
}

export default UserRepository
