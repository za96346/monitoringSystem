import DevicePo from "../po/DevicePo";
import DeviceEntity from "../entity/DeviceEntity";
import { domainService } from "types/domainService";

class DeviceDomainService implements domainService.DeviceDomainService {
    // PO to Domain Entity
    toDomainEntity(devicePo: DevicePo): DeviceEntity {
        return new DeviceEntity({
            id: devicePo?.id,
            deviceName: devicePo?.device_name,
            sort: devicePo?.sort,
            isDeleted: devicePo?.is_deleted,
            isStopped: devicePo?.is_stopped,
            updateTime: devicePo?.update_time,
            createTime: devicePo?.create_time
        });
    }

    // Domain Entity to PO
    toPersistenceObject(device: DeviceEntity): DevicePo {
        const devicePo = new DevicePo();
        devicePo.id = device?.id;
        return devicePo;
    }
}

export default DeviceDomainService