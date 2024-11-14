import DeviceDataEntity from "domain/entity/DeviceDataEntity"
import DeviceEntity from "domain/entity/DeviceEntity"

/**
 * @description app service layer params
*/
declare namespace AppServiceParams {
    interface EntryAPP {
        loginParams: {
            account: string,
            password: string
        }
    }
    interface DeviceApp {
        getParams: {}
        deleteParams: {}
        updateParams: {}
        addParams: {}
        dataReceiveParams: {}
    }
}

/**
 * @description app service layer interface
*/
declare namespace AppService {
    interface Instance {
        EntryApp: EntryApp
        DeviceApp: DeviceApp
        DeviceDataApp: DeviceDataApp
    }

    /**
     * @description 資料監控app
    */
   interface DeviceDataApp {
        /**
         * @description 資料收集 from esp32
         * 
         * @returns
        */
        async dataReceive(deviceDataEntity: DeviceDataEntity): Promise<boolean>
   }

    /**
     * @description 入口app
    */
    interface EntryApp {
        /**
         * @description 登入
         * 
         * @returns JWT token
        */
        async login(userEntity: UserEntity): Promise<string | null>
    }

    /**
     * @description 裝置app
    */
    interface DeviceApp {
        /**
         * @description 取得裝置
         * 
         * @returns 裝置list
        */
        async get(params: AppServiceParams.DeviceApp["getParams"]): Promise<DeviceEntity[]>

        /**
         * @description 刪除裝置
         * 
         * @returns 是否刪除成功
        */
        async delete(deviceEntity: DeviceEntity): Promise<boolean>

        /**
         * @description 更新裝置
         * 
         * @returns 是否更新成功
        */
        async update(eviceEntity: DeviceEntity): Promise<DeviceEntity>

        /**
         * @description 新增裝置
         * 
         * @returns 是否新增成功
        */
        async add(deviceEntity: DeviceEntity): Promise<DeviceEntity>
    }
}