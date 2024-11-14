import DeviceEntity from "domain/entity/DeviceEntity";
import { AppService } from "types/AppService";
import { Repository } from "types/Repository";
import { domainService } from "types/domainService";

class DeviceApp implements AppService.DeviceApp {
    private deviceRepo: Repository.Device
    private deviceDomainService: domainService.DeviceDomainService

    constructor({
        deviceRepo,
        deviceDomainService
    }: {
        deviceRepo: Repository.Device,
        deviceDomainService: domainService.DeviceDomainService,
    }) {
        this.deviceRepo = deviceRepo
        this.deviceDomainService = deviceDomainService
    }

    async get(): Promise<DeviceEntity[]> {
        const result = await this.deviceRepo.getDevices()
        return result.map((item) => this.deviceDomainService.toDomainEntity(item))
    }
    async delete(deviceEntity: DeviceEntity): Promise<boolean> {
        const devicePo = this.deviceDomainService.toPersistenceObject(deviceEntity)
        return await this.deviceRepo.delete(devicePo)
    }
    async update(deviceEntity: DeviceEntity): Promise<DeviceEntity> {
        const devicePo = this.deviceDomainService.toPersistenceObject(deviceEntity)
        const result = await this.deviceRepo.update(devicePo)
        return this.deviceDomainService.toDomainEntity(result)
    }
    async add(deviceEntity: DeviceEntity): Promise<DeviceEntity> {
        const devicePo = this.deviceDomainService.toPersistenceObject(deviceEntity)
        const reuslt = await this.deviceRepo.add(devicePo)
        return this.deviceDomainService.toDomainEntity(reuslt)
    }

}

export default DeviceApp