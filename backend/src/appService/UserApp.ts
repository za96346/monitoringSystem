import UserEntity from "domain/entity/UserEntity"
import { AppService } from "types/AppService";
import { Repository } from "types/Repository";
import { domainService } from "types/domainService";

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
