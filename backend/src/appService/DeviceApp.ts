import DeviceDataEntity from "domain/entity/DeviceDataEntity";
import DeviceEntity from "domain/entity/DeviceEntity";
import { AppService } from "types/AppService";
import { Repository } from "types/Repository";
import { domainService } from "types/domainService";

class DeviceApp implements AppService.DeviceApp {
    private deviceRepo: Repository.Device
    private deviceDataRepo: Repository.DeviceData
    private deviceDomainService: domainService.DeviceDomainService
    private deviceDataDomainService: domainService.DeviceDataDomainService

    constructor({
        deviceRepo,
        deviceDataRepo,
        deviceDomainService,
        deviceDataDomainService
    }: {
        deviceRepo: Repository.Device,
        deviceDataRepo: Repository.DeviceData
        deviceDomainService: domainService.DeviceDomainService,
        deviceDataDomainService: domainService.DeviceDataDomainService
    }) {
        this.deviceRepo = deviceRepo
        this.deviceDataRepo = deviceDataRepo
        this.deviceDomainService = deviceDomainService
        this.deviceDataDomainService = deviceDataDomainService
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
    async dataReceive(deviceDataEntity: DeviceDataEntity): Promise<boolean> {
        const deviceDataPo = this.deviceDataDomainService.toPersistenceObject(deviceDataEntity)
        const reuslt = await this.deviceDataRepo.add(deviceDataPo)

        return Object.keys(reuslt || {})?.length > 0
    }

}

export default DeviceApp