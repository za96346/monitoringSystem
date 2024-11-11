import DeviceEntity from "domain/entity/DeviceEntity";
import { AppService } from "types/AppService";
import { Repository } from "types/Repository";

class DeviceApp implements AppService.DeviceApp {
    private deviceRepo: Repository.Device

    constructor({ deviceRepo }: { deviceRepo: Repository.Device }) {
        this.deviceRepo = deviceRepo
    }

    get(): DeviceEntity[] {
        return this.deviceRepo.getDevices()
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