import UserPo from "domain/po/UserPo"
import DevicePo from "domain/po/DevicePo"

declare namespace Repository {
    /**
     * @description 資料庫instance
    */
    interface Instance {
        Device: Device
        User: User
    }

    /**
     * @description 裝置repo
    */
    interface Device {
        async getDevices(): Promise<DevicePo[]>
        async update(deviceData: DevicePo): Promise<DevicePo | null>
        async add(deviceData: DevicePo): Promise<DevicePo>
        async delete(deviceData: DevicePo): Promise<boolean>
    }

    /**
     * @description 使用者repo
    */
    interface User {
        async getUsers(): Promise<UserPo[]>
        async getUserById(userData: UserPo): Promise<UserPo | null>
        async getUserByAccount(userData: UserPo): Promise<UserPo | null>
        async update(userData: UserPo): Promise<UserPo | null> 
        async add(userData: UserPo): Promise<UserPo>
        async delete(userData: UserPo): Promise<boolean>
    }
}
