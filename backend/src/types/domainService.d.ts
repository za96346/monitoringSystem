import DeviceEntity from "domain/entity/DeviceEntity"
import DevicePo from "domain/po/DevicePo"

declare namespace domainService {
    interface DeviceDomainService {
        static toDomainEntity(devicePo: DevicePo): DeviceEntity
        static toPersistenceObject(device: DeviceEntity): DevicePo
    }
}