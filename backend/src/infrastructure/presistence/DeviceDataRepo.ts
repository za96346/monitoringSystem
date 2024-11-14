import DeviceDataPo from "../../domain/po/DeviceDataPo";
import { Repository } from "types/Repository";

import { DataSource, Repository as TypeORMRepository } from "typeorm";


class DeviceDataRepo implements Repository.DeviceData {
    private ormRepository: TypeORMRepository<DeviceDataPo>;

    constructor(dataSource: DataSource) {
        this.ormRepository = dataSource.getRepository(DeviceDataPo);
    }

    async getDeviceDatas(deviceData: DeviceDataPo): Promise<DeviceDataPo[]> {
        return await this.ormRepository.find({
            where: { device_id: deviceData.device_id }
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