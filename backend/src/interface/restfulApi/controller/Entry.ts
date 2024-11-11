import { Request, Response } from 'express';
import { AppService } from 'types/AppService';
import { Repository } from 'types/Repository';

/**
 * @description 入口控制器
*/
class Entry {
    private entryApp: AppService.EntryApp

    constructor ({ entryApp }: { entryApp: AppService.EntryApp }) {
        this.entryApp = entryApp
    }

    /**
     * @description 登入
    */
    login(req: Request, res: Response) {
        res.send('Hello, TypeScript with Express!');
    }
}

export default Entry