import { Request, Response } from 'express';
import { Repository } from 'types/Repository';

/**
 * @description 入口控制器
*/
class Entry {
    private userRepo: Repository.User

    constructor ({ userRepo }: { userRepo: Repository.User }) {
        this.userRepo = userRepo
    }

    /**
     * @description 登入
    */
    login(req: Request, res: Response) {
        res.send('Hello, TypeScript with Express!');
    }
}

export default Entry