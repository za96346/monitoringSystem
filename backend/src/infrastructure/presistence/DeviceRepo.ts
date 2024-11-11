import DevicePo from "domain/po/DevicePo";
import { Repository } from "types/Repository";

class DeviceRepo implements Repository.Device {
    get(): DevicePo {
        throw new Error("Method not implemented.");
    }
    update(): DevicePo {
        throw new Error("Method not implemented.");
    }
    add(): DevicePo {
        throw new Error("Method not implemented.");
    }
    delete(): DevicePo {
        throw new Error("Method not implemented.");
    }

}

export default DeviceRepo