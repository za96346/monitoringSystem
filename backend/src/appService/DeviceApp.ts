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
        deviceDomainService: domainService.DeviceDomainService
    }) {
        this.deviceRepo = deviceRepo
        this.deviceDomainService = deviceDomainService
    }

    async get(): Promise<DeviceEntity[]> {
        const result = await this.deviceRepo.getDevices()
        return result.map((item) => this.deviceDomainService.toDomainEntity(item))
    }
    delete(): boolean {
        throw new Error("Method not implemented.");
    }
    update(): boolean {
        throw new Error("Method not implemented.");
    }
    add(): boolean {
        throw new Error("Method not implemented.");
    }
    dataReceive(): void {
        throw new Error("Method not implemented.");
    }

}

export default DeviceApp