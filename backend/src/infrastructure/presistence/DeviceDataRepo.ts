import DeviceDataPo from "../../domain/po/DeviceDataPo";
import { Repository } from "types/Repository";

import { DataSource, Repository as TypeORMRepository, In } from "typeorm";
import { AppServiceParams } from "types/AppService";


class DeviceDataRepo implements Repository.DeviceData {
    private ormRepository: TypeORMRepository<DeviceDataPo>;

    constructor(dataSource: DataSource) {
        this.ormRepository = dataSource.getRepository(DeviceDataPo);
    }

    async getDeviceDatasByDeviceIds(params: AppServiceParams.DeviceDataApp["getDeviceDatasByDeviceIds"]): Promise<DeviceDataPo[]> {
        return await this.ormRepository.find({
            where: {
                device_id: In(params)
            }
        });
    }

    async add(deviceData: DeviceDataPo): Promise<DeviceDataPo> {
        const deviceDataAdded = this.ormRepository.create(deviceData);
        return await this.ormRepository.save(deviceDataAdded);
    }

    async delete(deviceData: DeviceDataPo): Promise<boolean> {
        const result = await this.ormRepository.delete({
            device_id: deviceData.device_id
        })
        return result.affected > 0;
    }
}

export default DeviceDataRepo