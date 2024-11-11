import { Repository } from "types/Repository"
import DeviceRepo from "./DeviceRepo"
import UserRepo from "./UserRepo"

const index = (): Repository.Instance => {
    return {
        Device: new DeviceRepo(),
        User: new UserRepo()
    }
}

export default index