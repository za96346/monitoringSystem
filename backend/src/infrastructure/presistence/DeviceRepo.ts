import DevicePo from "../../domain/po/DevicePo";
import { Repository } from "types/Repository";

import { DataSource, Repository as TypeORMRepository } from "typeorm";

class DeviceRepo implements Repository.Device {
    private ormRepository: TypeORMRepository<DevicePo>;

    constructor(dataSource: DataSource) {
        this.ormRepository = dataSource.getRepository(DevicePo);
    }

    async getDevices(): Promise<DevicePo[]> {
        return await this.ormRepository.find();
    }

    async getDeviceById(deviceData: DevicePo): Promise<DevicePo | null> {
        const device = await this.ormRepository.findOneBy({ id: deviceData.id });
        return device || null;
    }

    async add(deviceData: DevicePo): Promise<DevicePo> {
        const device = this.ormRepository.create(deviceData);
        return await this.ormRepository.save(device);
    }

    async update(deviceData: DevicePo): Promise<DevicePo> {
        const device = await this.getDeviceById(deviceData);
        if (!device) {
        throw new Error(`Device with id ${deviceData.id} not found.`);
        }
        Object.assign(device, deviceData);
        return await this.ormRepository.save(device);
    }

    async delete(deviceData: DevicePo): Promise<void> {
        const result = await this.ormRepository.delete(deviceData.id);
        if (result.affected === 0) {
            throw new Error(`Device with id ${deviceData.id} not found.`);
        }
    }
}

export default DeviceRepo