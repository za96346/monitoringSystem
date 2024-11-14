import DeviceDataEntity from "domain/entity/DeviceDataEntity";
import { AppService, AppServiceParams } from "types/AppService";
import { domainService } from "types/domainService";
import { Repository } from "types/Repository";

class DeviceDataApp implements AppService.DeviceDataApp {
    private deviceDataRepo: Repository.DeviceData
    private deviceDataDomainService: domainService.DeviceDataDomainService

    constructor({
        deviceDataRepo,
        deviceDataDomainService
    }: {
        deviceDataRepo: Repository.DeviceData,
        deviceDataDomainService: domainService.DeviceDataDomainService,
    }) {
        this.deviceDataRepo = deviceDataRepo
        this.deviceDataDomainService = deviceDataDomainService
    }

    async getDeviceDatasByDeviceIds(params: AppServiceParams.DeviceDataApp["getDeviceDatasByDeviceIds"]): Promise<DeviceDataEntity[]> {
        const deviceDatas = await this.deviceDataRepo.getDeviceDatasByDeviceIds(params)
        return deviceDatas.map((item) => this.deviceDataDomainService.toDomainEntity(item))
    }

    async dataReceive(deviceDataEntity: DeviceDataEntity): Promise<boolean> {
        const deviceDataPo = this.deviceDataDomainService.toPersistenceObject(deviceDataEntity)
        const reuslt = await this.deviceDataRepo.add(deviceDataPo)

        return Object.keys(reuslt || {})?.length > 0
    }
}

export default DeviceDataApp