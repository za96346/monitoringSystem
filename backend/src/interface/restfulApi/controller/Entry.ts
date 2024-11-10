import { Request, Response } from 'express';

/**
 * @description 入口控制器
*/
class Entry {
    /**
     * @description 登入
    */
    login(req: Request, res: Response) {
        res.send('Hello, TypeScript with Express!');
    }
}

export default new Entry()