import { Request, Response } from 'express';
import { AppService } from 'types/AppService';

/**
 * @description 裝置控制器
*/
class Device {
    private deviceApp: AppService.DeviceApp

    constructor({ deviceApp }: { deviceApp: AppService.DeviceApp }) {
        this.deviceApp = deviceApp
    }

    /**
     * @description 取得裝置
    */
    get(req: Request, res: Response): void {
        const appResult = this.deviceApp.get({})
        res.json({
            data: appResult
        })
    }

    /**
     * @description 刪除裝置
    */
    delete(req: Request, res: Response): void {
    }

    /**
     * @description 更新裝置
    */
    update(req: Request, res: Response): void {
    }

    /**
     * @description 新增裝置
    */
    add(req: Request, res: Response): void {
    }

    /**
     * @description 資料收集 from esp32
    */
    dataReceive(req: Request, res: Response): void {

    }
}

export default Device