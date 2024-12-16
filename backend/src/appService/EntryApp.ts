import UserEntity from "../domain/entity/UserEntity";
import { AppService } from "types/AppService";
import { domainService } from "types/domainService";
import { Repository } from "types/Repository";
import jwt from 'jsonwebtoken';

class EntryApp implements AppService.EntryApp {
    private userRepo: Repository.User
    private userDomainService: domainService.UserDomainService
    private jwtSecretKey: string

    constructor({
        userRepo,
        userDomainService,
        jwtSecretKey
    }: {
        userRepo: Repository.User,
        userDomainService: domainService.UserDomainService
        jwtSecretKey: string
    }) {
        this.userRepo = userRepo
        this.userDomainService = userDomainService
        this.jwtSecretKey = jwtSecretKey
    }

    async login(userEntity: UserEntity): Promise<string | null> {
        
        const userPo = this.userDomainService.toPersistenceObject(userEntity)
        const dbResult = await this.userRepo.getUserByAccount(userPo)

        if (Object.keys(dbResult || {})?.length === 0) return null

        if (
            userEntity.account === dbResult?.accout
            && userEntity.password === dbResult?.password
        ) {
            const payload = { id: dbResult.id };
            const options = { expiresIn: '1h' }; // 設置 JWT 的有效時間，例如 1 小時
            return jwt.sign(payload, this.jwtSecretKey, options);
        }
        return null
    }
}

export default EntryApp