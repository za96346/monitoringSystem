import { Request, Response } from 'express';
import DeviceEntity from '../../../domain/entity/DeviceEntity';
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
    async get(req: Request, res: Response): Promise<void> {
        const appResult = await this.deviceApp.get({})
        res.json({
            data: appResult,
            errorMessage: "",
            errorStatus: true
        })
    }

    /**
     * @description 刪除裝置
    */
    async delete(req: Request, res: Response): Promise<void> {
        const dbResult = await this.deviceApp.delete(new DeviceEntity({ id: 0 }))

        res.json({
            errorMessage: "",
            errorStatus: dbResult
        })
    }

    /**
     * @description 更新裝置
    */
    async update(req: Request, res: Response): Promise<void> {
        const dbResult = await this.deviceApp.update(new DeviceEntity({ id: 0 }))

        res.json({
            errorMessage: "",
            errorStatus: dbResult
        })
    }

    /**
     * @description 新增裝置
    */
    async add(req: Request, res: Response): Promise<void> {
        const dbResult = await this.deviceApp.add(new DeviceEntity({ id: 0 }))

        res.json({
            errorMessage: "",
            errorStatus: dbResult
        })
    }

    /**
     * @description 資料收集 from esp32
    */
    dataReceive(req: Request, res: Response): void {

    }
}

export default Device