import { Request, Response } from 'express';
import { AppService } from 'types/AppService';
import BaseController from './BaseController'

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
    login(req: Request, res: Response) {
        const validateResult = this.hasBodyData<{ account: string, password: string }>(req, res)
        if (!validateResult.isPass) return
        res.send('Hello, TypeScript with Express!');
    }
}

export default Entry