import DeviceDataEntity from "domain/entity/DeviceDataEntity"
import DeviceEntity from "domain/entity/DeviceEntity"
import UserEntity from "domain/entity/UserEntity"
import DeviceDataPo from "domain/po/DeviceDataPo"
import DevicePo from "domain/po/DevicePo"
import UserPo from "domain/po/UserPo"

declare namespace domainService {
    interface DeviceDomainService {
        toDomainEntity(devicePo: DevicePo): DeviceEntity
        toPersistenceObject(device: DeviceEntity): DevicePo
    }
    interface DeviceDataDomainService {
        toDomainEntity(deviceDataPo: DeviceDataPo): DeviceDataEntity
        toPersistenceObject(deviceData: DeviceDataEntity): DeviceDataPo
    }
    interface UserDomainService {
        toDomainEntity(userPo: UserPo): UserEntity
        toPersistenceObject(user: UserEntity): UserPo
    }
}