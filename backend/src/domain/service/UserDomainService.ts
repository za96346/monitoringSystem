import UserEntity from "../entity/UserEntity"
import UserPo from "../po/UserPo"
import { domainService } from "types/domainService"

class UserDomainService implements domainService.UserDomainService {
    toDomainEntity(userPo: UserPo): UserEntity {
        return new UserEntity({
            id: userPo?.id,
            userName: userPo?.user_name || "",
            accout: userPo?.accout || "",
            password: userPo?.password || "",
            sort: userPo?.sort || 0,
            isDeleted: userPo?.is_deleted || 0,
            updateTime: userPo?.update_time,
            createTime: userPo?.create_time
        })
    }
    toPersistenceObject(user: UserEntity): UserPo {
        const userPo = new UserPo()
        userPo.id = user.id
        userPo.user_name = user?.userName || ""
        userPo.accout = user?.accout || ""
        userPo.password = user?.password || ""
        userPo.sort = user?.sort || 0
        userPo.is_deleted = user?.isDeleted || 0
        return userPo
    }
}

export default UserDomainService