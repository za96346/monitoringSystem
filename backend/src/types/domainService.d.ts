import DeviceEntity from "domain/entity/DeviceEntity"
import UserEntity from "domain/entity/UserEntity"
import DevicePo from "domain/po/DevicePo"
import UserPo from "domain/po/UserPo"

declare namespace domainService {
    interface DeviceDomainService {
        toDomainEntity(devicePo: DevicePo): DeviceEntity
        toPersistenceObject(device: DeviceEntity): DevicePo
    }
    interface UserDomainService {
        toDomainEntity(devicePo: UserPo): UserEntity
        toPersistenceObject(device: UserEntity): UserPo
    }
}