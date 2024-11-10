import DeviceEntity from "domain/entity/DeviceEntity"
/**
 * @description app service layer interface
*/
declare namespace AppService {
    /**
     * @description 入口app
    */
    interface EntryApp {
        /**
         * @description 登入
         * 
         * @returns JWT token
        */
        login(): string
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
        get(): DeviceEntity[]

        /**
         * @description 刪除裝置
         * 
         * @returns 是否刪除成功
        */
        delete(): boolean

        /**
         * @description 更新裝置
         * 
         * @returns 是否更新成功
        */
        update(): boolean

        /**
         * @description 新增裝置
         * 
         * @returns 是否新增成功
        */
        add(): boolean

        /**
         * @description 資料收集 from esp32
         * 
         * @returns
        */
        dataReceive(): void
    }
}