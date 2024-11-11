import { Request, Response } from 'express';
import { AppService } from 'types/AppService';
import { Repository } from 'types/Repository';

/**
 * @description 入口控制器
*/
class Entry {
    private userRepo: Repository.User
    private entryApp: AppService.EntryApp

    constructor ({ userRepo, entryApp }: { userRepo: Repository.User, entryApp: AppService.EntryApp }) {
        this.userRepo = userRepo
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