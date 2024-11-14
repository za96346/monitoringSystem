import { Request, Response } from 'express';
import { AppService } from 'types/AppService';
import BaseController from './BaseController'
import DeviceDataEntity from '../../../domain/entity/DeviceDataEntity';

/**
 * @description 裝置控制器
*/
class DeviceData extends BaseController {
    private deviceDataApp: AppService.DeviceDataApp

    constructor({ deviceDataApp }: { deviceDataApp: AppService.DeviceDataApp }) {
        super()
        this.deviceDataApp = deviceDataApp
    }

    /**
     * @description 資料收集 from esp32
    */
    async dataReceive(req: Request, res: Response): Promise<void> {
        const validateResult = this.hasBodyData<DeviceDataEntity>(req, res)
        if (!validateResult.isPass) return

        const appResult = await this.deviceDataApp.dataReceive(validateResult.body)

        res.json({
            errorMessage: "",
            data: appResult
        })
    }
}

export default DeviceData