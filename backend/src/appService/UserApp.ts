import UserEntity from "domain/entity/UserEntity"
import { AppService } from "types/AppService";
import { Repository } from "types/Repository";
import { domainService } from "types/domainService";


/**
 * @todo step 2. 此物件實作你定義的使用者介面
 * 可以參考appService底下的檔案
 * Repository.User 已經實現完成, 只需要注入 Repository.User 去存取db 即可
 * 
 * 去存取db 前，需要把 userEntity 物件 轉換完 db 物件 userPo,
 * 轉換函式已經實作完成，只需要注入userDomainService物件，並調用 toPersistenceObject
 * 
*/
class UserApp implements AppService.UserApp{
    userRepo: Repository.User
    userDomainService: domainService.UserDomainService

    constructor(
        {
            userRepo,
            userDomainService
        }:{
            userRepo: Repository.User,
            userDomainService: domainService.UserDomainService
        }
    ) {
        this.userRepo = userRepo
        this.userDomainService = userDomainService
    }

    async add(userEntity: UserEntity): Promise<UserEntity> {
        const userPo = this.userDomainService.toPersistenceObject(userEntity)
        const result = await this.userRepo.add(userPo)
        return this.userDomainService.toDomainEntity(result)
    }
    async delete(userEntity: UserEntity): Promise<boolean> {
        const userPo = this.userDomainService.toPersistenceObject(userEntity)
        return await this.userRepo.delete(userPo)
    }
    async update(userEntity: UserEntity): Promise<UserEntity> {
        const userPo = this.userDomainService.toPersistenceObject(userEntity)
        const result = await this.userRepo.update(userPo)
        return this.userDomainService.toDomainEntity(result)
    }
    async get(userEntity: UserEntity): Promise<UserEntity[]> {
        const result = await this.userRepo.getUsers()
        return result.map((item) => this.userDomainService.toDomainEntity(item))
    }
    
}

export default UserApp
