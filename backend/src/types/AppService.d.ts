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
    }
    interface DeviceDataApp {
        getDeviceDatasByDeviceIds: number[]
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
        /**
         * @todo step 3 加上 UserApp, 類型為底下你定義的介面
        */
        UserApp: UserApp
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

        /**
         * @description 取得裝置數據
         * 
         * @returns
        */
       async getDeviceDatasByDeviceIds(param: AppServiceParams.DeviceDataApp["getDeviceDatasByDeviceIds"]): Promise<DeviceDataEntity[]>
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
        async update(deviceEntity: DeviceEntity): Promise<DeviceEntity>

        /**
         * @description 新增裝置
         * 
         * @returns 是否新增成功
        */
        async add(deviceEntity: DeviceEntity): Promise<DeviceEntity>
    }

    /**
     * @todo step 1. 加上 使用者的介面
     * interface 介面描述
     * 需要有以下功能 ( 為非同步，需加上async, 回傳需加上 Promise<MyReturType> 泛型 )
     *      新增 (input: userEntity, output: userEntity)
     *      刪除 (input: userEntity, output: boolean)
     *      修改 (input: userEntity, output: userEntity)
     *      查詢 (input: userEntity, output: userEntity[])
    */
    interface UserApp{

        async add(userEntity: UserEntity): Promise<UserEntity>

        async delete(userEntity: UserEntity): Promise<boolean>

        async update(userEntity: UserEntity): Promise<UserEntity>

        async get(userEntity: UserEntity): Promise<UserEntity[]>

    }
}
