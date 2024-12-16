import { Request, Response } from 'express';
import { AppService } from 'types/AppService';
import BaseController from './BaseController'
import UserEntity from '../../../domain/entity/UserEntity';

/**
 * @description 入口控制器
*/
class Entry extends BaseController {
    private entryApp: AppService.EntryApp

    constructor ({ entryApp }: { entryApp: AppService.EntryApp }) {
        super()
        this.entryApp = entryApp
    }

    /**
     * @description 登入
    */
    async login(req: Request, res: Response): Promise<void> {
        const validateResult = this.hasBodyData<{ account: string, password: string }>(req, res)
        if (!validateResult.isPass) return
        
        const result = await this.entryApp.login(new UserEntity({
            account: validateResult.body?.account,
            password: validateResult.body.password
        }))

        res.json({
            errorMessage: "",
            data: result
        })
    }
}

export default Entry