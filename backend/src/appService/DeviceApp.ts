import DeviceEntity from "domain/entity/DeviceEntity";
import { AppService } from "types/AppService";

class DeviceApp implements AppService.DeviceApp {
    get(): DeviceEntity[] {
        throw new Error("Method not implemented.");
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