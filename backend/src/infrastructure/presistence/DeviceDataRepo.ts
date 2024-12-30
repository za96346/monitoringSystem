import DeviceDataPo from "../../domain/po/DeviceDataPo";
import { Repository } from "types/Repository";

import { DataSource, Repository as TypeORMRepository, In, MoreThan, Between } from "typeorm";
import { AppServiceParams } from "types/AppService";


class DeviceDataRepo implements Repository.DeviceData {
    private ormRepository: TypeORMRepository<DeviceDataPo>;

    constructor(dataSource: DataSource) {
        this.ormRepository = dataSource.getRepository(DeviceDataPo);
    }

    async getDeviceDatasByDeviceIdsCreateTime(
        deviceIds: number[],
        startTime: Date,
        endTime: Date
    ): Promise<DeviceDataPo[]> {
        return await this.ormRepository.find({
            where: {
                device_id: In(deviceIds),
                create_time: Between(startTime, endTime),
            },
            take: 30
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