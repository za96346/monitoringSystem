import { Request, Response } from 'express';
import DeviceEntity from '../../../domain/entity/DeviceEntity';
import { AppService } from 'types/AppService';
import BaseController from './BaseController'
import DeviceDataEntity from '../../../domain/entity/DeviceDataEntity';

/**
 * @description 裝置控制器
*/
class Device extends BaseController {
    private deviceApp: AppService.DeviceApp

    constructor({ deviceApp }: { deviceApp: AppService.DeviceApp }) {
        super()
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
            errorStatus: true,
        })
    }

    /**
     * @description 刪除裝置
    */
    async delete(req: Request, res: Response): Promise<void> {
        const validateResult = this.hasBodyData<DeviceEntity>(req, res)
        if (!validateResult.isPass) return

        const appResult = await this.deviceApp.delete(validateResult.body)

        res.json({
            errorMessage: "",
            errorStatus: appResult
        })
    }

    /**
     * @description 更新裝置
    */
    async update(req: Request, res: Response): Promise<void> {
        const validateResult = this.hasBodyData<DeviceEntity>(req, res)
        if (!validateResult.isPass) return

        const appResult = await this.deviceApp.update(validateResult.body)

        res.json({
            errorMessage: "",
            errorStatus: appResult
        })
    }

    /**
     * @description 新增裝置
    */
    async add(req: Request, res: Response): Promise<void> {
        const validateResult = this.hasBodyData<DeviceEntity>(req, res)
        if (!validateResult.isPass) return

        const appResult = await this.deviceApp.add(validateResult.body)

        res.json({
            errorMessage: "",
            data: appResult
        })
    }

    /**
     * @description 資料收集 from esp32
    */
    async dataReceive(req: Request, res: Response): Promise<void> {
        const validateResult = this.hasBodyData<DeviceDataEntity>(req, res)
        if (!validateResult.isPass) return

        const appResult = await this.deviceApp.dataReceive(validateResult.body)

        res.json({
            errorMessage: "",
            data: appResult
        })
    }
}

export default Device