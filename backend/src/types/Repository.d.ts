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
        get(): DevicePo
        update(): DevicePo
        add(): DevicePo
        delete(): DevicePo
    }

    /**
     * @description 使用者repo
    */
    interface User {
        get(): UserPo
        update(): UserPo
        add(): UserPo
        delete(): UserPo
    }
}
