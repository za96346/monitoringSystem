import { Repository } from "types/Repository"
import DeviceRepo from "./DeviceRepo"
import UserRepo from "./UserRepo"
import { DataSource, DataSourceOptions } from "typeorm";

const index = (option: DataSourceOptions): Repository.Instance => {
    const appDataSource = new DataSource(option);
    appDataSource.initialize()
    return {
        Device: new DeviceRepo(appDataSource),
        User: new UserRepo()
    }
}

export default index