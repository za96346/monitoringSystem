import { Request, Response } from 'express';
import { AppService } from 'types/AppService';
import { Repository } from 'types/Repository';

/**
 * @description 裝置控制器
*/
class Device {
    private deviceRepo: Repository.Device
    private deviceApp: AppService.DeviceApp

    constructor({ deviceRepo, deviceApp }: { deviceRepo: Repository.Device, deviceApp: AppService.DeviceApp }) {
        this.deviceRepo = deviceRepo
        this.deviceApp = deviceApp
    }

    /**
     * @description 取得裝置
    */
    get(req: Request, res: Response): void {
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