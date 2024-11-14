import DeviceDataPo from "../po/DeviceDataPo";
import DeviceDataEntity from "../entity/DeviceDataEntity";
import { domainService } from "types/domainService";

class DeviceDataDomainService implements domainService.DeviceDataDomainService {
    toDomainEntity(deviceDataPo: DeviceDataPo): DeviceDataEntity {
        return new DeviceDataEntity({
            id: deviceDataPo.id,
            deviceId: deviceDataPo.device_id,
            data: JSON.parse(deviceDataPo?.data || '{}') || {},
            updateTime: deviceDataPo.update_time,
            createTime: deviceDataPo.create_time
        })
    }
    toPersistenceObject(deviceData: DeviceDataEntity): DeviceDataPo {
        const deviceDataPo = new DeviceDataPo()
        deviceDataPo.id = deviceData.id
        deviceDataPo.device_id = deviceData.deviceId
        deviceDataPo.data = JSON.stringify(deviceData?.data || {})
        return deviceDataPo
    }

}

export default DeviceDataDomainService