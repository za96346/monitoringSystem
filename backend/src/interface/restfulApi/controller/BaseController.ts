import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

abstract class BaseController{
    /**
     * @describe body 是否有帶資料
    */
    protected hasBodyData<T>(req: Request, res: Response): {isPass: boolean, body?: T} {
        const data: T = req.body;

        if (!validationResult(req).isEmpty()) {
            return { isPass: false }
        }

        if (Object.keys(data)?.length === 0) {
            res.statusCode = 401
            res.json({
                errorMessage: "body data error",
            })
            return { isPass: false }
        }
        return { isPass: false, body: data }
    }
}

export default BaseController