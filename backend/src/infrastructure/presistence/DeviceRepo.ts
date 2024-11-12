import DevicePo from "../../domain/po/DevicePo";
import { Repository } from "types/Repository";

import { DataSource, Repository as TypeORMRepository } from "typeorm";

class DeviceRepo implements Repository.Device {
    private ormRepository: TypeORMRepository<DevicePo>;

    constructor(dataSource: DataSource) {
        this.ormRepository = dataSource.getRepository(DevicePo);
    }

    async getDevices(): Promise<DevicePo[]> {
        return await this.ormRepository.find({
            where: { is_deleted: 0 }
        });
    }

    async getDeviceById(deviceData: DevicePo): Promise<DevicePo | null> {
        const device = await this.ormRepository.findOneBy({ id: deviceData.id });
        return device || null;
    }

    async add(deviceData: DevicePo): Promise<DevicePo> {
        const device = this.ormRepository.create(deviceData);
        return await this.ormRepository.save(device);
    }

    async update(deviceData: DevicePo): Promise<DevicePo | null> {
        const device = await this.getDeviceById(deviceData);
        if (!device) {
            return null
        }
        Object.assign(device, deviceData);
        device.is_deleted = 0
        return await this.ormRepository.save(device);
    }

    async delete(deviceData: DevicePo): Promise<boolean> {
        const device = await this.getDeviceById(deviceData);
        if (!device) {
            return true
        }

        Object.assign(device, deviceData);
        device.is_deleted = 1

        await this.ormRepository.save(device);
        return true
    }
}

export default DeviceRepo